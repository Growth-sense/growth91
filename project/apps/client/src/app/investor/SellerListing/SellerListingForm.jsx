import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { message, Spin, Modal, Button, Table, Tag, Tooltip, Upload, Popconfirm } from "antd";
import Bridge from "../../constants/Bridge";
import NewWebHeader from "../../common/NewWebHeader";
import { NewWebFooter } from "../../common/NewWebFooter";
import secureStorage from "../../helper/storageEncryptionHelper";
import "./SellerListing.css"; // We'll create this next

// --- Validation Schemas per Step ---
const stepSchemas = [
    // Step 0: Basic Info
    z.object({
        tsdUserName: z.string().min(1, "User Name is required"),
        tsdUserEmail: z.string().email("Valid email is required"),
        tsdUserMobile: z.string().min(10, "Valid mobile number is required"),
        tsdInvestorName: z.string().min(1, "Investor Name is required"),
        tsdPanNumber: z.string().optional(),
        tsdPanName: z.string().optional(),
        tsdResidentialStatus: z.enum(["Resident Indian", "NRI", "Foreign National", "Body Corporate", "LLP", "Trust", "Others"], {
            errorMap: () => ({ message: "Please select a valid residential status" })
        }),
    }),
    // Step 1: Company Info
    z.object({
        tsdLegalName: z.string().min(1, "Legal Name of Company is required"),
        tsdStartupName: z.string().min(1, "Startup Brand Name is required"),
        tsdYearOfInvestment: z.string().min(1, "Year of investment is required"),
    }),
    // Step 2: Security Details
    z.object({
        tsdInstrumentType: z.enum([
            "Equity Shares",
            "CCPS - Fixed Conversion Price",
            "CCPS - Variable Conversion Price",
            "CCD - Fixed Conversion Price",
            "CCD - Variable Conversion Price",
            "Other"
        ], { errorMap: () => ({ message: "Please select an instrument type" }) }),
        tsdInvestmentTerms: z.string().max(64000, "Maximum 64,000 characters allowed. If your terms are longer, please summarize them.").optional(),
    }),
    // Step 3: Security Information
    z.object({
        tsdQuantity: z.string().min(1, "Quantity is required"),
        tsdLastKnownPrice: z.string().min(1, "Last known price is required"),
        tsdAskPriceMin: z.string().min(1, "Minimum Ask Price is required"),
        tsdAskPriceExpected: z.string().min(1, "Expected Ask Price is required"),
    }),
    // Step 4: Upload Documents
    z.object({
        // We will validate files manually since they are file objects, not simple strings
        // Zod file validation in RHF can be tricky, so we'll do custom validation on submit
    }),
    // Step 5: Demat Information
    z.object({
        tsdIsDemat: z.boolean(),
        tsdDpName: z.string().optional(),
        tsdDpId: z.string().optional(),
        tsdClientId: z.string().optional(),
        tsdIsinNumber: z.string().optional(),
    }).superRefine((data, ctx) => {
        if (data.tsdIsDemat) {
            if (!data.tsdDpName) ctx.addIssue({ path: ["tsdDpName"], message: "DP Name is required", code: "custom" });
            if (!data.tsdDpId) ctx.addIssue({ path: ["tsdDpId"], message: "DP ID is required", code: "custom" });
            if (!data.tsdClientId) ctx.addIssue({ path: ["tsdClientId"], message: "Client ID is required", code: "custom" });
            if (!data.tsdIsinNumber) ctx.addIssue({ path: ["tsdIsinNumber"], message: "ISIN Number is required", code: "custom" });
        }
    }),
    // Step 6: Additional Information & Declaration
    z.object({
        tsdHasPoa: z.boolean(),
        tsdDeclare: z.boolean().refine(val => val === true, {
            message: "You must accept the declaration"
        }),
    })
];

// Combined schema for all fields so react-hook-form doesn't drop values on step change
const fullSchema = z.object({
    tsdUserName: z.string().optional(),
    tsdUserEmail: z.string().optional(),
    tsdUserMobile: z.string().optional(),
    tsdInvestorName: z.string().optional(),
    tsdPanNumber: z.string().optional(),
    tsdResidentialStatus: z.string().optional(),
    tsdLegalName: z.string().optional(),
    tsdStartupName: z.string().optional(),
    tsdYearOfInvestment: z.string().optional(),
    tsdInstrumentType: z.string().optional(),
    tsdInvestmentTerms: z.string().optional(),
    tsdQuantity: z.string().optional(),
    tsdLastKnownPrice: z.string().optional(),
    tsdAskPriceMin: z.string().optional(),
    tsdAskPriceExpected: z.string().optional(),
    tsdIsDemat: z.boolean().optional(),
    tsdDpName: z.string().optional(),
    tsdDpId: z.string().optional(),
    tsdClientId: z.string().optional(),
    tsdIsinNumber: z.string().optional(),
    tsdHasPoa: z.boolean().optional(),
    tsdDeclare: z.boolean().optional(),
});

// Fields to validate per step
const stepFields = [
    ["tsdUserName", "tsdUserEmail", "tsdUserMobile", "tsdInvestorName", "tsdResidentialStatus"],
    ["tsdLegalName", "tsdStartupName", "tsdYearOfInvestment"],
    ["tsdInstrumentType"],
    ["tsdQuantity", "tsdLastKnownPrice", "tsdAskPriceMin", "tsdAskPriceExpected"],
    [], // Step 4: file uploads validated manually
    ["tsdIsDemat"], // Step 5: demat + conditional fields
    ["tsdDeclare"], // Step 6: declaration
];

export const SellerListingForm = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [highestStepReached, setHighestStepReached] = useState(0);
    const [declarationModalVisible, setDeclarationModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [listingId, setListingId] = useState(null);

    // Dashboard states
    const [viewMode, setViewMode] = useState("table");
    const [myListings, setMyListings] = useState([]);
    const [fetchingListings, setFetchingListings] = useState(true);

    // Custom File States
    const [files, setFiles] = useState({
        tsdShareCertificate: null,
        tsdExecutedSha: null,
        tsdDoa: null,
        tsdPoaDoc: null
    });

    const [existingFiles, setExistingFiles] = useState({});

    const getUploadProps = (docType, label) => ({
        name: "file",
        action: `${process.env.REACT_APP_BASE_URL}api/investors/SellerListing/upload_document?id=${listingId}&type=${docType}`,
        showUploadList: false,
        onChange(info) {
            if (info.file.status === 'uploading') {
                message.loading({ content: `Uploading ${label}...`, key: docType });
            }
            if (info.file.status === 'done') {
                const response = info.file.response;
                if (response && String(response.status) === "1") {
                    message.success({ content: `${label} uploaded successfully!`, key: docType });
                    setExistingFiles(prev => ({ ...prev, [docType]: response.filename }));
                } else {
                    message.error({ content: response?.message || `${label} upload failed.`, key: docType });
                }
            } else if (info.file.status === 'error') {
                message.error({ content: `${info.file.name} upload failed.`, key: docType });
            }
        },
    });

    const { register, handleSubmit, control, watch, setValue, trigger, reset, getValues, setError, clearErrors, formState: { errors } } = useForm({
        resolver: zodResolver(fullSchema),
        mode: "onChange",
        shouldUnregister: false,
        defaultValues: {
            tsdUserName: "",
            tsdUserEmail: "",
            tsdUserMobile: "",
            tsdInvestorName: "",
            tsdPanNumber: "",
            tsdPanName: "",
            tsdResidentialStatus: "Resident Indian",
            tsdLegalName: "",
            tsdStartupName: "",
            tsdYearOfInvestment: "",
            tsdInstrumentType: "Equity Shares",
            tsdInvestmentTerms: "",
            tsdQuantity: "",
            tsdLastKnownPrice: "",
            tsdAskPriceMin: "",
            tsdAskPriceExpected: "",
            tsdIsDemat: false,
            tsdDpName: "",
            tsdDpId: "",
            tsdClientId: "",
            tsdIsinNumber: "",
            tsdHasPoa: false,
            tsdDeclare: false
        }
    });

    const isDemat = watch("tsdIsDemat");
    const hasPoa = watch("tsdHasPoa");
    const investmentTerms = watch("tsdInvestmentTerms") || "";

    const fetchListings = async () => {
        try {
            setFetchingListings(true);
            const userId = secureStorage.getItem("investor_id");
            if (userId) {
                const res = await Bridge.getMySellerListings({ tsdUserId: userId });
                console.log("Listings response:", res.data);
                if (String(res.status) === "1" && res.data) {
                    setMyListings(res.data);
                }
            }
        } catch (err) {
            console.error(err);
            message.error("Failed to load listings");
        } finally {
            setFetchingListings(false);
        }
    };

    const [fetchingPan, setFetchingPan] = useState(false);

    useEffect(() => {
        fetchListings();
    }, []);

    const verifyPan = async () => {
        const panno = getValues("tsdPanNumber");
        if (!panno || panno.length !== 10) {
            message.error("Please enter a valid 10-character PAN number.");
            return;
        }

        setFetchingPan(true);
        try {
            // Use the official CodeIgniter backend endpoint on Prod which has its IP whitelisted by Cashfree
            const PAN_VERIFY_URL = "https://growth91.com/api/Panverification/verify_pan";
            const response = await axios.post(PAN_VERIFY_URL, {
                pan_no: panno
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            let verificationResult = null;
            if (response.data && response.data.status === "1" && response.data.data) {
                // The backend returns the Cashfree JSON as a string inside the 'data' field
                verificationResult = typeof response.data.data === 'string'
                    ? JSON.parse(response.data.data)
                    : response.data.data;
            }

            if (verificationResult && verificationResult.valid === true) {
                setValue("tsdPanName", verificationResult.registered_name);
                clearErrors("tsdPanName");
                message.success("PAN verified successfully.");
            } else {
                message.error(verificationResult?.message || "Invalid PAN number or verification failed.");
                setValue("tsdPanName", "");
            }
        } catch (err) {
            message.error("Error verifying PAN.");
            setValue("tsdPanName", "");
        } finally {
            setFetchingPan(false);
        }
    };

    // The useEffect that auto-fetched the latest draft has been removed.
    // Data is now populated specifically when clicking "Edit" on a row.

    const handleFileChange = (e, fieldName) => {
        if (e.target.files && e.target.files[0]) {
            setFiles(prev => ({ ...prev, [fieldName]: e.target.files[0] }));
        }
    };

    const isStepValid = (stepIndex) => {
        const currentValues = getValues();
        const result = stepSchemas[stepIndex].safeParse(currentValues);

        // Step 0: conditional pan validation
        if (stepIndex === 0) {
            if (currentValues.tsdPanNumber && !currentValues.tsdPanName) return false;
        }

        // Step 4: file uploads validated manually
        if (stepIndex === 4) {
            if (!existingFiles.tsdShareCertificate) return false;
            if (!existingFiles.tsdExecutedSha) return false;
        }

        // Step 5: conditional demat validation
        if (stepIndex === 5 && currentValues.tsdIsDemat) {
            if (!currentValues.tsdDpName || !currentValues.tsdDpId || !currentValues.tsdClientId || !currentValues.tsdIsinNumber) return false;
        }

        // Step 6: conditional poa validation
        if (stepIndex === 6 && currentValues.tsdHasPoa) {
            if (!existingFiles.tsdPoaDoc) return false;
        }

        return result.success;
    };

    const [isNexting, setIsNexting] = useState(false);

    const handleNext = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        // Prevent double-clicks
        if (isNexting) return;

        if (!isStepValid(currentStep)) {
            // Highlight the fields by populating RHF errors based on the Zod schema
            const currentValues = getValues();
            const result = stepSchemas[currentStep].safeParse(currentValues);
            if (!result.success) {
                result.error.issues.forEach(issue => {
                    setError(issue.path[0], { type: "manual", message: issue.message });
                });
            }

            // Manual error highlights
            if (currentStep === 0 && currentValues.tsdPanNumber && !currentValues.tsdPanName) {
                setError("tsdPanName", { type: "manual", message: "Please verify PAN to fetch Name" });
            }
        } else {
            (stepFields[currentStep] || []).forEach(field => clearErrors(field));
        }

        setIsNexting(true);
        setCurrentStep((prev) => {
            const next = Math.min(prev + 1, stepSchemas.length - 1);
            setHighestStepReached((h) => Math.max(h, next));
            return next;
        });
        window.scrollTo(0, 0);

        // Release the lock after rendering completes
        setTimeout(() => setIsNexting(false), 300);
    };

    const handlePrev = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
        window.scrollTo(0, 0);
    };

    const saveDraft = async (isFinalSubmit = false) => {
        const formData = new FormData();
        const currentValues = watch();
        const userId = secureStorage.getItem("investor_id");

        formData.append("tsdUserId", userId);
        if (listingId) formData.append("tsdTempSdID", listingId);

        Object.keys(currentValues).forEach(key => {
            const val = currentValues[key];
            formData.append(key, typeof val === 'boolean' ? (val ? "1" : "0") : (val || ""));
        });

        try {
            const response = await Bridge.saveSellerListingDraft(formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            if (response.status === "1") {
                setListingId(response.id);
                if (!isFinalSubmit) {
                    message.success("Draft saved successfully");
                }
                return response.id;
            } else {
                message.error(response.message || "Failed to save draft");
                return false;
            }
        } catch (err) {
            console.error(err);
            message.error("Error connecting to server");
            return false;
        }
    };

    const handleSaveDraftAndExit = async () => {
        const success = await saveDraft();
        if (success) {
            setViewMode("table");
            fetchListings();
        }
    };

    const onSubmit = async (data) => {
        setHighestStepReached(stepSchemas.length - 1);
        // Validate ALL steps before submitting
        for (let i = 0; i < stepSchemas.length; i++) {
            if (!isStepValid(i)) {
                setCurrentStep(i);
                message.error(`Please complete all required fields in "${stepsList[i]}" before submitting.`);
                window.scrollTo(0, 0);
                return;
            }
        }

        setSubmitLoading(true);
        const finalId = await saveDraft(true);

        if (finalId) {
            try {
                const response = await Bridge.submitSellerListing({
                    tsdTempSdID: finalId
                });
                if (response.status === "1") {
                    Modal.success({
                        title: "Listing Submitted Successfully",
                        content: "Your seller listing has been submitted for review.",
                        onOk: () => {
                            setViewMode("table");
                            fetchListings();
                        }
                    });
                } else {
                    message.error(response.data?.message || "Submission failed");
                }
            } catch (err) {
                message.error("Error submitting for review.");
            }
        }
        setSubmitLoading(false);
    };

    const renderSteps = () => {
        return (
            <>
                <div className="form-step" style={{ display: currentStep === 0 ? 'block' : 'none' }}>
                    <h4 className="mb-4">Basic Information</h4>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label>User Name</label>
                            <input className="form-control bg-light" disabled {...register("tsdUserName")} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Email Address</label>
                            <input className="form-control bg-light" disabled {...register("tsdUserEmail")} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Mobile Number <span className="text-danger">*</span></label>
                            <input className="form-control bg-light" disabled {...register("tsdUserMobile")} />
                            {errors.tsdUserMobile && <small className="text-danger">{errors.tsdUserMobile.message}</small>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Investor Name <span className="text-danger">*</span></label>
                            <input className="form-control" {...register("tsdInvestorName")} />
                            <div className="mt-2">
                                <input
                                    type="checkbox"
                                    id="sameAsUserName"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setValue("tsdInvestorName", watch("tsdUserName"));
                                            clearErrors("tsdInvestorName");
                                        } else {
                                            setValue("tsdInvestorName", "");
                                        }
                                    }}
                                />
                                <label htmlFor="sameAsUserName" className="ml-2 mb-0" style={{ marginLeft: "8px" }}>Same as User Name</label>
                            </div>
                            {errors.tsdInvestorName && <small className="text-danger">{errors.tsdInvestorName.message}</small>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>PAN Number</label>
                            <div style={{ position: "relative" }}>
                                <input
                                    className="form-control"
                                    maxLength={10}
                                    style={{ paddingRight: !watch("tsdPanName") ? "110px" : "15px", textTransform: "uppercase" }}
                                    {...register("tsdPanNumber")}
                                    onChange={(e) => {
                                        setValue("tsdPanNumber", e.target.value.toUpperCase());
                                        if (watch("tsdPanName")) {
                                            setValue("tsdPanName", "");
                                        }
                                    }}
                                />
                                {!watch("tsdPanName") && (
                                    <Button
                                        type="primary"
                                        shape="round"
                                        onClick={verifyPan}
                                        loading={fetchingPan}
                                        style={{
                                            position: "absolute",
                                            right: "6px",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            height: "26px",
                                            fontSize: "12px",
                                            padding: "0 12px",
                                            backgroundColor: "#100050",
                                            borderColor: "#100050",
                                            display: "flex",
                                            alignItems: "center"
                                        }}
                                    >
                                        <i className="fa-solid fa-user-check mr-2" style={{ marginRight: "4px" }}></i> Verify
                                    </Button>
                                )}
                            </div>
                            {errors.tsdPanNumber && <small className="text-danger">{errors.tsdPanNumber.message}</small>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Name as per PAN</label>
                            <input
                                className="form-control bg-light"
                                disabled
                                placeholder={watch("tsdPanName") ? "" : "Please verify PAN"}
                                {...register("tsdPanName")}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Residential Status <span className="text-danger">*</span></label>
                            <select className="form-control" {...register("tsdResidentialStatus")}>
                                <option value="Resident Indian">Resident Indian</option>
                                <option value="NRI">NRI</option>
                                <option value="Foreign National">Foreign National</option>
                                <option value="Body Corporate">Body Corporate</option>
                                <option value="LLP">LLP</option>
                                <option value="Trust">Trust</option>
                                <option value="Others">Others</option>
                            </select>
                            {errors.tsdResidentialStatus && <small className="text-danger">{errors.tsdResidentialStatus.message}</small>}
                        </div>
                    </div>
                </div>

                <div className="form-step" style={{ display: currentStep === 1 ? 'block' : 'none' }}>
                    <h4 className="mb-4">Company Information</h4>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <label>
                                Legal Name of Company <span className="text-danger">*</span>
                                <Tooltip title="Legal name of the entity as mentioned on the Share Certificate">
                                    <i className="fa-solid fa-circle-info ml-2 text-muted" style={{ marginLeft: "8px", cursor: "pointer" }}></i>
                                </Tooltip>
                            </label>
                            <input className="form-control" {...register("tsdLegalName")} />
                            {errors.tsdLegalName && <small className="text-danger">{errors.tsdLegalName.message}</small>}
                        </div>
                        <div className="col-md-12 mb-3">
                            <label>
                                Startup/Common Brand Name <span className="text-danger">*</span>
                                <Tooltip title="Commonly known name of the Startup. If not available, use first word of the company name">
                                    <i className="fa-solid fa-circle-info ml-2 text-muted" style={{ marginLeft: "8px", cursor: "pointer" }}></i>
                                </Tooltip>
                            </label>
                            <input className="form-control" {...register("tsdStartupName")} />
                            {errors.tsdStartupName && <small className="text-danger">{errors.tsdStartupName.message}</small>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Year of Investment <span className="text-danger">*</span></label>
                            <input type="number" className="form-control" {...register("tsdYearOfInvestment")} />
                            {errors.tsdYearOfInvestment && <small className="text-danger">{errors.tsdYearOfInvestment.message}</small>}
                        </div>
                    </div>
                </div>

                <div className="form-step" style={{ display: currentStep === 2 ? 'block' : 'none' }}>
                    <h4 className="mb-4">Security Details</h4>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label>Instrument Type <span className="text-danger">*</span></label>
                            <select className="form-control" {...register("tsdInstrumentType")}>
                                <option value="Equity Shares">Equity Shares</option>
                                <option value="CCPS - Fixed Conversion Price">CCPS – Fixed Conversion Price</option>
                                <option value="CCPS - Variable Conversion Price">CCPS – Variable Conversion Price</option>
                                <option value="CCD - Fixed Conversion Price">CCD – Fixed Conversion Price</option>
                                <option value="CCD - Variable Conversion Price">CCD – Variable Conversion Price</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.tsdInstrumentType && <small className="text-danger">{errors.tsdInstrumentType.message}</small>}
                        </div>
                        <div className="col-md-12 mb-3">
                            <label>Investment/Conversion Terms (Optional)</label>
                            <textarea className="form-control" rows="4" maxLength="64000" {...register("tsdInvestmentTerms")}></textarea>
                            {investmentTerms.length >= 64000 && <small className="text-danger">Maximum 64,000 characters allowed. If your terms are longer, please summarize them.</small>}
                            {errors.tsdInvestmentTerms && <small className="text-danger">{errors.tsdInvestmentTerms.message}</small>}
                        </div>
                    </div>
                </div>

                <div className="form-step" style={{ display: currentStep === 3 ? 'block' : 'none' }}>
                    <h4 className="mb-4">Security Information</h4>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label>Quantity <span className="text-danger">*</span></label>
                            <input type="number" className="form-control" {...register("tsdQuantity")} />
                            {errors.tsdQuantity && <small className="text-danger">{errors.tsdQuantity.message}</small>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Last Known Transaction Price <span className="text-danger">*</span></label>
                            <input type="number" className="form-control" {...register("tsdLastKnownPrice")} />
                            {errors.tsdLastKnownPrice && <small className="text-danger">{errors.tsdLastKnownPrice.message}</small>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Ask Price – Minimum <span className="text-danger">*</span></label>
                            <input type="number" className="form-control" {...register("tsdAskPriceMin")} />
                            {errors.tsdAskPriceMin && <small className="text-danger">{errors.tsdAskPriceMin.message}</small>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Ask Price – Expected <span className="text-danger">*</span></label>
                            <input type="number" className="form-control" {...register("tsdAskPriceExpected")} />
                            {errors.tsdAskPriceExpected && <small className="text-danger">{errors.tsdAskPriceExpected.message}</small>}
                        </div>
                    </div>
                </div>

                <div className="form-step" style={{ display: currentStep === 4 ? 'block' : 'none' }}>
                    <h4 className="mb-4">Upload Documents</h4>
                    <div className="row">
                        <div className="col-md-12 mb-4">
                            <label className="font-weight-bold">Share Certificate <span className="text-danger">*</span></label>
                            <div className="mt-2">
                                <Upload {...getUploadProps("tsdShareCertificate", "Share Certificate")} accept=".pdf">
                                    <Button icon={<i className="fa-solid fa-cloud-arrow-up mr-2"></i>}>Select Document</Button>
                                </Upload>
                            </div>
                            {existingFiles.tsdShareCertificate && <div className="text-success small mt-2"><i className="fa fa-check"></i> Document successfully uploaded</div>}
                        </div>
                        <div className="col-md-12 mb-4">
                            <label className="font-weight-bold">Executed SHA <span className="text-danger">*</span></label>
                            <div className="mt-2">
                                <Upload {...getUploadProps("tsdExecutedSha", "Executed SHA")} accept=".pdf">
                                    <Button icon={<i className="fa-solid fa-cloud-arrow-up mr-2"></i>}>Select Document</Button>
                                </Upload>
                            </div>
                            {existingFiles.tsdExecutedSha && <div className="text-success small mt-2"><i className="fa fa-check"></i> Document successfully uploaded</div>}
                        </div>
                        <div className="col-md-12 mb-4">
                            <label className="font-weight-bold">DOA (if applicable)</label>
                            <div className="mt-2">
                                <Upload {...getUploadProps("tsdDoa", "DOA")} accept=".pdf">
                                    <Button icon={<i className="fa-solid fa-cloud-arrow-up mr-2"></i>}>Select Document</Button>
                                </Upload>
                            </div>
                            {existingFiles.tsdDoa && <div className="text-success small mt-2"><i className="fa fa-check"></i> Document successfully uploaded</div>}
                        </div>
                    </div>
                </div>

                <div className="form-step" style={{ display: currentStep === 5 ? 'block' : 'none' }}>
                    <h4 className="mb-4">Demat Information</h4>
                    <div className="row">
                        <div className="col-md-12 mb-4">
                            <label className="mr-3">Are the securities held in Demat form?</label>
                            <div className="mt-3">
                                <label className="premium-switch">
                                    <input type="checkbox" checked={isDemat} onChange={(e) => setValue("tsdIsDemat", e.target.checked)} />
                                    <span className="slider"></span>
                                </label>
                            </div>
                        </div>
                        {isDemat && (
                            <>
                                <div className="col-md-6 mb-3">
                                    <label>DP Name <span className="text-danger">*</span></label>
                                    <input className="form-control" {...register("tsdDpName")} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>DP ID <span className="text-danger">*</span></label>
                                    <input className="form-control" {...register("tsdDpId")} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Client ID <span className="text-danger">*</span></label>
                                    <input className="form-control" {...register("tsdClientId")} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>ISIN Number <span className="text-danger">*</span></label>
                                    <input className="form-control" {...register("tsdIsinNumber")} />
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="form-step" style={{ display: currentStep === 6 ? 'block' : 'none' }}>
                    <h4 className="mb-4">Additional Information & Declaration</h4>
                    <div className="mb-4 p-4 border rounded">
                        <label>Is any Power of Attorney (POA) granted?</label>
                        <div className="mt-2">
                            <label className="premium-switch">
                                <input type="checkbox" checked={hasPoa} onChange={(e) => setValue("tsdHasPoa", e.target.checked)} />
                                <span className="slider"></span>
                            </label>
                        </div>
                        {hasPoa && (
                            <div className="mt-3">
                                <Upload {...getUploadProps("tsdPoaDoc", "POA Document")} accept=".pdf">
                                    <Button icon={<i className="fa-solid fa-cloud-arrow-up mr-2"></i>}>Select Document</Button>
                                </Upload>
                                {existingFiles.tsdPoaDoc && (
                                    <small className="text-success mt-1 d-block"><i className="fa fa-check"></i> Document previously uploaded</small>
                                )}
                            </div>
                        )}
                    </div>
                    {/* <div className="alert alert-warning mb-4" role="alert">
              <strong>Note:</strong> The seller can make edits in the Quantity, Last Known Transaction Price, Ask Price – Minimum, Ask Price – Expected or any other documents can be uploaded, removed etc and the same has to be notified to Growth91 admin after every edit is done and will need the approval of admin to list the updated opportunity.
            </div> */}
                    <h5 className="mb-3">Mandatory Declarations</h5>
                    
                    <div className="declaration-checkbox-container mb-2 mt-4">
                        <input type="checkbox" id="declaration-checkbox" {...register("tsdDeclare")} />
                        <label htmlFor="declaration-checkbox" className="declaration-label" style={{ fontWeight: "bold" }}>
                            I agree to the <a href="#!" onClick={(e) => { e.preventDefault(); setDeclarationModalVisible(true); }}>declarations</a> <span className="text-danger">*</span>
                        </label>
                    </div>
                    {errors.tsdDeclare && <div className="text-danger mb-3">{errors.tsdDeclare.message}</div>}

                    <Modal
                        title="Mandatory Declarations"
                        open={declarationModalVisible}
                        onCancel={() => setDeclarationModalVisible(false)}
                        width={900}
                        footer={[
                            <Button key="close" type="primary" onClick={() => setDeclarationModalVisible(false)}>
                                Close
                            </Button>
                        ]}
                    >
                        <div className="declaration-list" style={{ padding: "10px", backgroundColor: "#f8f9fa", borderRadius: "8px", border: "1px solid #dee2e6" }}>
                            <ul style={{ listStyleType: "disc", paddingLeft: "20px", marginBottom: "0", fontSize: "14px" }}>
                                <li className="mb-2">I confirm that I am the lawful holder of the above-mentioned securities.</li>
                                <li className="mb-2">I confirm that submission of this listing request does not violate any Shareholders’ Agreement, Articles of Association, investment agreement, lock-in provision, ROFO/ROFR obligation, or applicable law.</li>
                                <li className="mb-2">I understand that listing on Growth91 does not guarantee finding a suitable buyer.</li>
                                <li className="mb-2">I agree to cooperate with Growth91, the company, founders, legal advisors, and prospective buyers for verification and transaction facilitation purposes.</li>
                                <li className="mb-2">I understand that all transactions are subject to applicable laws, company approvals, contractual rights, and due diligence.</li>
                                <li className="mb-2">I agree to pay applicable fees, charges, and taxes as communicated by Growth91.</li>
                                <li>I agree to indemnify Growth91, its affiliates, directors, employees, representatives, and associates against any loss, claim, dispute, liability, or regulatory action arising from incorrect information, breach of agreements, or unauthorized sale attempt.</li>
                            </ul>
                        </div>
                    </Modal>
                </div>
            </>
        );
    };

    const stepsList = ["Basic Info", "Company Info", "Security Details", "Security Info", "Documents", "Demat Info", "Declaration"];

    const editListing = (record) => {
        setListingId(record.tsdTempSdID);

        // First, start with standard defaults (from local storage)
        const baseValues = {
            tsdUserName: secureStorage.getItem("investor_name") || "",
            tsdUserEmail: secureStorage.getItem("investor_email") || "",
            tsdUserMobile: secureStorage.getItem("investor_mobile") || "",
            tsdInvestorName: "",
            tsdPanNumber: secureStorage.getItem("investor_pan") || "",
            tsdPanName: secureStorage.getItem("investor_pan_name") || "",
            tsdResidentialStatus: "Resident Indian",
            tsdLegalName: "",
            tsdStartupName: "", tsdYearOfInvestment: "", tsdInstrumentType: "Equity Shares",
            tsdInvestmentTerms: "", tsdQuantity: "", tsdLastKnownPrice: "",
            tsdAskPriceMin: "", tsdAskPriceExpected: "", tsdDpName: "",
            tsdDpId: "", tsdClientId: "", tsdIsinNumber: "", tsdDeclare: false, tsdHasPoa: false, tsdIsDemat: false
        };

        // Overlay whatever is actually saved in the DB record
        Object.keys(record).forEach(key => {
            if (record[key] !== null && record[key] !== "") {
                if (key === "tsdIsDemat" || key === "tsdHasPoa" || key === "tsdDeclare") {
                    baseValues[key] = (record[key] == 1 || record[key] === true);
                } else {
                    baseValues[key] = record[key];
                }
            }
        });

        // Reset the form with the combined values
        reset(baseValues);

        setExistingFiles({
            tsdShareCertificate: record.tsdShareCertificate,
            tsdExecutedSha: record.tsdExecutedSha,
            tsdDoa: record.tsdDoa,
            tsdPoaDoc: record.tsdPoaDoc
        });

        setFiles({});
        setCurrentStep(0);
        setHighestStepReached(stepsList.length - 1);
        setViewMode("form");
    };

    const deleteDraft = async (tempId) => {
        try {
            const response = await Bridge.deleteSellerListingDraft({ tsdTempSdID: tempId });
            if (response && String(response.status) === "1") {
                message.success("Draft deleted successfully.");
                fetchListings();
            } else {
                message.error(response?.message || "Failed to delete draft.");
            }
        } catch (err) {
            message.error("Error deleting draft.");
        }
    };

    const columns = [
        { title: "Legal Name", dataIndex: "tsdLegalName", key: "tsdLegalName" },
        { title: "Startup Name", dataIndex: "tsdStartupName", key: "tsdStartupName" },
        {
            title: "Status", dataIndex: "tsdStatus", key: "tsdStatus", render: (status) => {
                let color = "blue";
                if (status === "Approved") color = "green";
                if (status === "Rejected") color = "red";
                if (status === "Draft" || status === "Additional Information Required") color = "orange";
                return <Tag color={color}>{status}</Tag>;
            }
        },
        {
            title: "Submit Date",
            key: "date",
            render: (_, record) => {
                if (record.tsdStatus === "Draft") return "-";
                const dateStr = record.tsdPublishedAt || record.tsdCreatedAt;
                return dateStr ? new Date(dateStr.replace(' ', 'T')).toLocaleDateString() : '-';
            }
        },
        {
            title: "Action", key: "action", render: (_, record) => {
                const canEdit = ["Draft", "Under Review", "Additional Information Required"].includes(record.tsdStatus);
                
                const isDraft = record.tsdStatus === "Draft";
                const hasBeenSubmitted = record.tsdHasMainRecord || myListings.some(r => r.tsdTempSdID === record.tsdTempSdID && r.tsdStatus !== "Draft");
                const canDelete = isDraft && !hasBeenSubmitted;

                return (
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {canEdit && <Button size="small" type="primary" onClick={() => editListing(record)}>Edit</Button>}
                        {canDelete && (
                            <Popconfirm
                                title="Delete Draft"
                                description="Are you sure you want to delete this draft?"
                                onConfirm={() => deleteDraft(record.tsdTempSdID)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button size="small" danger>Delete</Button>
                            </Popconfirm>
                        )}
                    </div>
                );
            }
        }
    ];

    return (
        <div
            className="seller-listing-wrapper"
            style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
            <NewWebHeader newabout={"newabout"} />

            <div style={{ flex: 1, paddingBottom: "3rem" }}>
                {viewMode === "table" ? (
                    <div className="container py-5 mt-5">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2 style={{ color: "#100050", fontWeight: "700" }}>My Seller Listings</h2>
                            <Button
                                type="primary"
                                size="large"
                                style={{ backgroundColor: "#ff9c1a", borderColor: "#ff9c1a", fontWeight: "bold" }}
                                onClick={async () => {
                                    reset({
                                        tsdUserName: secureStorage.getItem("investor_name") || "",
                                        tsdUserEmail: secureStorage.getItem("investor_email") || "",
                                        tsdUserMobile: secureStorage.getItem("investor_mobile") || "",
                                        tsdInvestorName: "",
                                        tsdPanNumber: secureStorage.getItem("investor_pan") || "",
                                        tsdPanName: secureStorage.getItem("investor_pan_name") || "",
                                        tsdResidentialStatus: "Resident Indian",
                                        tsdLegalName: "",
                                        tsdStartupName: "", tsdYearOfInvestment: "", tsdInstrumentType: "Equity Shares",
                                        tsdInvestmentTerms: "", tsdQuantity: "", tsdLastKnownPrice: "",
                                        tsdAskPriceMin: "", tsdAskPriceExpected: "", tsdDpName: "",
                                        tsdDpId: "", tsdClientId: "", tsdIsinNumber: "", tsdDeclare: false, tsdHasPoa: false, tsdIsDemat: false
                                    });

                                    try {
                                        const res = await Bridge.initSellerListingDraft({
                                            tsdUserId: secureStorage.getItem("investor_id")
                                        });
                                        if (res.status === "1" && res.id) {
                                            setListingId(res.id);
                                        } else {
                                            message.error("Failed to initialize draft. Please try again.");
                                            return; // stop and don't open form
                                        }
                                    } catch (err) {
                                        message.error("Network error initializing draft.");
                                        return;
                                    }

                                    setCurrentStep(0);
                                    setHighestStepReached(0);
                                    setFiles({});
                                    setExistingFiles({});
                                    setViewMode("form");
                                }}
                            >
                                + Create New Listing
                            </Button>
                        </div>

                        <div className="card border-0 shadow-sm" style={{ borderRadius: "12px", overflow: "hidden" }}>
                            <Table
                                dataSource={myListings}
                                columns={columns}
                                rowKey="tsdTempSdID"
                                loading={fetchingListings}
                                pagination={{ pageSize: 10 }}
                                scroll={{ x: 'max-content' }}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="container py-5 mt-5">
                        <div className="mb-4">
                            <Button type="link" onClick={() => setViewMode("table")} style={{ padding: 0 }}>
                                <i className="fa-solid fa-arrow-left mr-2"></i> Back to Dashboard
                            </Button>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 text-center mb-5">
                                <h2 style={{ color: "#100050", fontWeight: "700" }}>Seller Listing Form</h2>
                                <br />
                                <p style={{ fontSize: "1.7em" }}>
                                    Provide details for your secondary listing
                                </p>
                            </div>
                        </div>

                        <Spin spinning={loading}>
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="multistep-form-icons">
                                        <ul>
                                            {stepsList.map((step, index) => {
                                                const isEvaluated = index !== currentStep && index <= highestStepReached;
                                                return (
                                                <li key={index} style={{ cursor: 'pointer' }} onClick={() => {
                                                    setCurrentStep(index); // Allow jumping to any step directly
                                                }}>
                                                    <div>
                                                        <div
                                                            className={
                                                                currentStep === index
                                                                    ? "circle active-tab"
                                                                    : isEvaluated
                                                                        ? (isStepValid(index) ? "circle success-tab" : "circle")
                                                                        : "circle"
                                                            }
                                                        >
                                                            {(currentStep === index || !isEvaluated) && (index + 1)}
                                                            {isEvaluated && isStepValid(index) && (
                                                                <i style={{ fontSize: 28 }} className="bx bx-check"></i>
                                                            )}
                                                            {isEvaluated && !isStepValid(index) && (
                                                                <i style={{ fontSize: 28, color: 'red' }} className="fa-solid fa-xmark"></i>
                                                            )}
                                                        </div>
                                                        <span>{step}</span>
                                                        {index !== stepsList.length - 1 && <div className="line"></div>}
                                                    </div>
                                                </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>

                                <div className="col-lg-8">
                                    <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: "15px" }}>
                                        <div className="card-body p-5">
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="min-vh-50">
                                                    {renderSteps()}
                                                </div>

                                                <div className="d-flex justify-content-between mt-5 pt-4 border-top">
                                                    <button
                                                        type="button"
                                                        className="btn-prev"
                                                        onClick={handlePrev}
                                                        disabled={currentStep === 0}
                                                        style={{ visibility: currentStep === 0 ? 'hidden' : 'visible' }}
                                                    >
                                                        <i className="fa-solid fa-arrow-left mr-2"></i> Previous
                                                    </button>

                                                    <div className="d-flex align-items-center">
                                                        <button
                                                            type="button"
                                                            className="btn-draft"
                                                            style={{ marginRight: '16px' }}
                                                            onClick={handleSaveDraftAndExit}
                                                        >
                                                            Save Draft
                                                        </button>

                                                        {currentStep < stepSchemas.length - 1 ? (
                                                            <button
                                                                type="button"
                                                                className="btn-next"
                                                                onClick={handleNext}
                                                            >
                                                                Next <i className="fa-solid fa-arrow-right ml-2"></i>
                                                            </button>
                                                        ) : (
                                                            <button
                                                                type="submit"
                                                                className="btn-submit"
                                                                disabled={submitLoading || isNexting}
                                                            >
                                                                {submitLoading ? <Spin size="small" /> : "Submit for Review"}
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Spin>
                    </div>
                )}
            </div>
            <NewWebFooter />
        </div>
    );
};
