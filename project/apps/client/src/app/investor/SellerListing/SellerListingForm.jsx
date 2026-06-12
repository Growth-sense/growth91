import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { message, Spin, Modal, Button, Table, Tag, Tooltip, Upload, Popconfirm } from "antd";
import Bridge from "../../constants/Bridge";
import Header from "../../common/Header";
import { NewWebFooter } from "../../common/NewWebFooter";
import MobileSidebar from "../common/Sidebar"; 
import DesktopSidebar from "../common/Sidebar2"; 
import FounderSidebar from "../../Founder/common/Sidebar";
import secureStorage from "../../helper/storageEncryptionHelper";
import "./SellerListing.css";

// --- Validation Schemas per Step ---
const stepSchemas = [
    // Step 0: Basic Info
    z.object({
        sdUserName: z.string().min(1, "User Name is required"),
        sdUserEmail: z.string().email("Valid email is required"),
        sdUserMobile: z.string().min(10, "Valid mobile number is required"),
        sdInvestorName: z.string().min(1, "Investor Name is required"),
        sdPanNumber: z.string().min(10, "Valid PAN Number is required"),
        sdPanName: z.string().min(1, "PAN Name must be verified"),
        sdResidentialStatus: z.enum(["Resident Indian", "NRI", "Foreign National", "Body Corporate", "LLP", "Trust", "Others"], {
            errorMap: () => ({ message: "Please select a valid residential status" })
        }),
    }),
    // Step 1: Company Info
    z.object({
        sdLegalName: z.string().min(1, "Legal Name of Company is required"),
        sdStartupName: z.string().min(1, "Startup Brand Name is required"),
        sdYearOfInvestment: z.string().regex(/^[12]\d{3}$/, "Please enter a valid 4-digit year (e.g., 2026)"),
    }),
    // Step 2: Security Details
    z.object({
        sdInstrumentType: z.enum([
            "Equity Shares",
            "CCPS - Fixed Conversion Price",
            "CCPS - Variable Conversion Price",
            "CCD - Fixed Conversion Price",
            "CCD - Variable Conversion Price",
            "Other"
        ], { errorMap: () => ({ message: "Please select an instrument type" }) }),
        sdInvestmentTerms: z.string().max(64000, "Maximum 64,000 characters allowed. If your terms are longer, please summarize them.").optional(),
    }),
    // Step 3: Security Information
    z.object({
        sdQuantity: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, { message: "Quantity must be a valid number greater than 0" }),
        sdLastKnownPrice: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, { message: "Last known price must be a valid number greater than 0" }),
        sdAskPriceMin: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, { message: "Minimum Ask Price must be a valid number greater than 0" }),
        sdAskPriceExpected: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, { message: "Expected Ask Price must be a valid number greater than 0" }),
    }),
    // Step 4: Upload Documents
    z.object({
        // We will validate files manually since they are file objects, not simple strings
        // Zod file validation in RHF can be tricky, so we'll do custom validation on submit
    }),
    // Step 5: Demat Information
    z.object({
        sdIsDemat: z.boolean(),
        sdDpName: z.string().optional(),
        sdDpId: z.string().optional(),
        sdClientId: z.string().optional(),
        sdIsinNumber: z.string().optional(),
    }).superRefine((data, ctx) => {
        if (data.sdIsDemat) {
            if (!data.sdDpName || data.sdDpName.trim().length < 2 || data.sdDpName.trim() === "0") ctx.addIssue({ path: ["sdDpName"], message: "Valid DP Name is required", code: "custom" });
            if (!data.sdDpId || data.sdDpId.trim().length < 4 || data.sdDpId.trim() === "0") ctx.addIssue({ path: ["sdDpId"], message: "Valid DP ID is required", code: "custom" });
            if (!data.sdClientId || data.sdClientId.trim().length < 4 || data.sdClientId.trim() === "0") ctx.addIssue({ path: ["sdClientId"], message: "Valid Client ID is required", code: "custom" });
            if (!data.sdIsinNumber || data.sdIsinNumber.trim().length < 4 || data.sdIsinNumber.trim() === "0") ctx.addIssue({ path: ["sdIsinNumber"], message: "Valid ISIN Number is required", code: "custom" });
        }
    }),
    // Step 6: Additional Information & Declaration
    z.object({
        sdHasPoa: z.boolean(),
        sdDeclare: z.boolean().refine(val => val === true, {
            message: "You must accept the declaration"
        }),
    })
];

// Combined schema for all fields so react-hook-form doesn't drop values on step change
const fullSchema = z.object({
    sdUserName: z.string().optional(),
    sdUserEmail: z.string().optional(),
    sdUserMobile: z.string().optional(),
    sdInvestorName: z.string().optional(),
    sdPanNumber: z.string().optional(),
    sdResidentialStatus: z.string().optional(),
    sdLegalName: z.string().optional(),
    sdStartupName: z.string().optional(),
    sdYearOfInvestment: z.string().optional(),
    sdInstrumentType: z.string().optional(),
    sdInvestmentTerms: z.string().optional(),
    sdQuantity: z.string().optional(),
    sdLastKnownPrice: z.string().optional(),
    sdAskPriceMin: z.string().optional(),
    sdAskPriceExpected: z.string().optional(),
    sdIsDemat: z.boolean().optional(),
    sdDpName: z.string().optional(),
    sdDpId: z.string().optional(),
    sdClientId: z.string().optional(),
    sdIsinNumber: z.string().optional(),
    sdHasPoa: z.boolean().optional(),
    sdDeclare: z.boolean().optional(),
});

// Fields to validate per step
const stepFields = [
    ["sdUserName", "sdUserEmail", "sdUserMobile", "sdInvestorName", "sdResidentialStatus"],
    ["sdLegalName", "sdStartupName", "sdYearOfInvestment"],
    ["sdInstrumentType"],
    ["sdQuantity", "sdLastKnownPrice", "sdAskPriceMin", "sdAskPriceExpected"],
    [], // Step 4: file uploads validated manually
    ["sdIsDemat"], // Step 5: demat + conditional fields
    ["sdDeclare"], // Step 6: declaration
];

export const SellerListingForm = () => {
    const isInvestor = localStorage.getItem("investor_id") ? true : false;
    const isFounder = localStorage.getItem("founder_id") ? true : false;

    const [currentStep, setCurrentStep] = useState(0);
    const [highestStepReached, setHighestStepReached] = useState(0);
    const [declarationModalVisible, setDeclarationModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [listingId, setListingId] = useState(null);
    const [currentListingStatus, setCurrentListingStatus] = useState("Draft");

    // Dashboard states
    const [viewMode, setViewMode] = useState("table");
    const [myListings, setMyListings] = useState([]);
    const [fetchingListings, setFetchingListings] = useState(true);

    // Custom File States
    const [files, setFiles] = useState({
        sdShareCertificate: null,
        sdExecutedSha: null,
        sdDoa: null,
        sdPoaDoc: null,
        sdAdditionalDoc: null
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
            sdUserName: "",
            sdUserEmail: "",
            sdUserMobile: "",
            sdInvestorName: "",
            sdPanNumber: "",
            sdPanName: "",
            sdResidentialStatus: "Resident Indian",
            sdLegalName: "",
            sdStartupName: "",
            sdYearOfInvestment: "",
            sdInstrumentType: "Equity Shares",
            sdInvestmentTerms: "",
            sdQuantity: "",
            sdLastKnownPrice: "",
            sdAskPriceMin: "",
            sdAskPriceExpected: "",
            sdIsDemat: false,
            sdDpName: "",
            sdDpId: "",
            sdClientId: "",
            sdIsinNumber: "",
            sdHasPoa: false,
            sdDeclare: false
        }
    });

    const isDemat = watch("sdIsDemat");
    const hasPoa = watch("sdHasPoa");
    const investmentTerms = watch("sdInvestmentTerms") || "";

    const [fetchingPan, setFetchingPan] = useState(false);
    const [investorProfile, setInvestorProfile] = useState({ mobile: "", pan: "", pan_name: "" });
    const [infoModalVisible, setInfoModalVisible] = useState(false);
    const [selectedInfoText, setSelectedInfoText] = useState("");

    const fetchProfile = async () => {
        try {
            const userId = secureStorage.getItem("investor_id");
            if (userId) {
                const res = await Bridge.getInvestorProfile({ sdUserId: userId });
                if (String(res.status) === "1") {
                    setInvestorProfile({
                        mobile: res.mobile || "",
                        pan: res.pan || "",
                        pan_name: res.pan_name || ""
                    });
                }
            }
        } catch (err) {
            console.error("Failed to fetch investor profile", err);
        }
    };

    const fetchListings = async () => {
        try {
            setFetchingListings(true);
            const userId = secureStorage.getItem("investor_id");
            if (userId) {
                const res = await Bridge.getMySellerListings({ sdUserId: userId });
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

    useEffect(() => {
        fetchProfile();
        fetchListings();
    }, []);

    const verifyPan = async () => {
        const panno = getValues("sdPanNumber");
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
                setValue("sdPanName", verificationResult.registered_name);
                clearErrors("sdPanName");
                message.success("PAN verified successfully.");
            } else {
                message.error(verificationResult?.message || "Invalid PAN number or verification failed.");
                setValue("sdPanName", "");
            }
        } catch (err) {
            message.error("Error verifying PAN.");
            setValue("sdPanName", "");
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
            if (currentValues.sdPanNumber && !currentValues.sdPanName) return false;
        }

        // Step 4: file uploads validated manually
        if (stepIndex === 4) {
            if (!existingFiles.sdShareCertificate) return false;
            if (!existingFiles.sdExecutedSha) return false;
        }

        // Step 5: conditional demat validation
        if (stepIndex === 5 && currentValues.sdIsDemat) {
            if (!currentValues.sdDpName || !currentValues.sdDpId || !currentValues.sdClientId || !currentValues.sdIsinNumber) return false;
        }

        // Step 6: conditional poa validation
        if (stepIndex === 6 && currentValues.sdHasPoa) {
            if (!existingFiles.sdPoaDoc) return false;
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
            if (currentStep === 0 && currentValues.sdPanNumber && !currentValues.sdPanName) {
                setError("sdPanName", { type: "manual", message: "Please verify PAN to fetch Name" });
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

        formData.append("sdUserId", userId);
        if (listingId) formData.append("sdSdID", listingId);

        Object.keys(currentValues).forEach(key => {
            const val = currentValues[key];
            formData.append(key, typeof val === 'boolean' ? (val ? "1" : "0") : (val || ""));
        });

        // Append existing file names so the DB updates properly
        Object.keys(existingFiles).forEach(key => {
            formData.append(key, existingFiles[key] === null ? "" : existingFiles[key]);
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
                
                // Highlight the errors on the form fields
                const currentValues = getValues();
                const result = stepSchemas[i].safeParse(currentValues);
                if (!result.success) {
                    result.error.issues.forEach(issue => {
                        setError(issue.path[0], { type: "manual", message: issue.message });
                    });
                }
                if (i === 0 && currentValues.sdPanNumber && !currentValues.sdPanName) {
                    setError("sdPanName", { type: "manual", message: "Please verify PAN to fetch Name" });
                }

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
                    sdSdID: finalId
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
        const isPanLocked = !!(investorProfile.pan && investorProfile.pan_name);
        
        return (
            <>
                <div className="form-step" style={{ display: currentStep === 0 ? 'block' : 'none' }}>
                    <h4 className="mb-4">Basic Information</h4>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label>User Name</label>
                            <input className="form-control bg-light" disabled {...register("sdUserName")} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Email Address</label>
                            <input className="form-control bg-light" disabled {...register("sdUserEmail")} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Mobile Number <span className="text-danger">*</span></label>
                            <input className={`form-control ${investorProfile.mobile ? 'bg-light' : ''}`} disabled={!!investorProfile.mobile} {...register("sdUserMobile")} />
                            {errors.sdUserMobile && <small className="text-danger">{errors.sdUserMobile.message}</small>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Investor Name <span className="text-danger">*</span></label>
                            <input className="form-control" {...register("sdInvestorName")} />
                            <div className="mt-2">
                                <input
                                    type="checkbox"
                                    id="sameAsUserName"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setValue("sdInvestorName", watch("sdUserName"));
                                            clearErrors("sdInvestorName");
                                        } else {
                                            setValue("sdInvestorName", "");
                                        }
                                    }}
                                />
                                <label htmlFor="sameAsUserName" className="ml-2 mb-0" style={{ marginLeft: "8px" }}>Same as User Name</label>
                            </div>
                            {errors.sdInvestorName && <small className="text-danger">{errors.sdInvestorName.message}</small>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>PAN Number <span className="text-danger">*</span></label>
                            <div style={{ position: "relative" }}>
                                <input
                                    className={`form-control ${isPanLocked ? 'bg-light' : ''}`}
                                    disabled={isPanLocked}
                                    maxLength={10}
                                    style={{ paddingRight: !watch("sdPanName") ? "110px" : "15px", textTransform: "uppercase" }}
                                    {...register("sdPanNumber")}
                                    onChange={(e) => {
                                        setValue("sdPanNumber", e.target.value.toUpperCase());
                                        if (watch("sdPanName")) {
                                            setValue("sdPanName", "");
                                        }
                                    }}
                                />
                                {!watch("sdPanName") && (
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
                            {errors.sdPanNumber && <small className="text-danger">{errors.sdPanNumber.message}</small>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Name as per PAN <span className="text-danger">*</span></label>
                            <input
                                className="form-control bg-light"
                                disabled
                                placeholder={watch("sdPanName") ? "" : "Please verify PAN"}
                                {...register("sdPanName")}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Residential Status <span className="text-danger">*</span></label>
                            <select className="form-control" {...register("sdResidentialStatus")}>
                                <option value="Resident Indian">Resident Indian</option>
                                <option value="NRI">NRI</option>
                                <option value="Foreign National">Foreign National</option>
                                <option value="Body Corporate">Body Corporate</option>
                                <option value="LLP">LLP</option>
                                <option value="Trust">Trust</option>
                                <option value="Others">Others</option>
                            </select>
                            {errors.sdResidentialStatus && <small className="text-danger">{errors.sdResidentialStatus.message}</small>}
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
                            <input className="form-control" {...register("sdLegalName")} />
                            {errors.sdLegalName && <small className="text-danger">{errors.sdLegalName.message}</small>}
                        </div>
                        <div className="col-md-12 mb-3">
                            <label>
                                Startup/Common Brand Name <span className="text-danger">*</span>
                                <Tooltip title="Commonly known name of the Startup. If not available, use first word of the company name">
                                    <i className="fa-solid fa-circle-info ml-2 text-muted" style={{ marginLeft: "8px", cursor: "pointer" }}></i>
                                </Tooltip>
                            </label>
                            <input className="form-control" {...register("sdStartupName")} />
                            {errors.sdStartupName && <small className="text-danger">{errors.sdStartupName.message}</small>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Year of Investment <span className="text-danger">*</span></label>
                            <input type="number" className="form-control" {...register("sdYearOfInvestment")} />
                            {errors.sdYearOfInvestment && <small className="text-danger">{errors.sdYearOfInvestment.message}</small>}
                        </div>
                    </div>
                </div>

                <div className="form-step" style={{ display: currentStep === 2 ? 'block' : 'none' }}>
                    <h4 className="mb-4">Security Details</h4>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label>Instrument Type <span className="text-danger">*</span></label>
                            <select className="form-control" {...register("sdInstrumentType")}>
                                <option value="Equity Shares">Equity Shares</option>
                                <option value="CCPS - Fixed Conversion Price">CCPS – Fixed Conversion Price</option>
                                <option value="CCPS - Variable Conversion Price">CCPS – Variable Conversion Price</option>
                                <option value="CCD - Fixed Conversion Price">CCD – Fixed Conversion Price</option>
                                <option value="CCD - Variable Conversion Price">CCD – Variable Conversion Price</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.sdInstrumentType && <small className="text-danger">{errors.sdInstrumentType.message}</small>}
                        </div>
                        <div className="col-md-12 mb-3">
                            <label>Investment/Conversion Terms (Optional)</label>
                            <textarea className="form-control" rows="4" maxLength="64000" {...register("sdInvestmentTerms")}></textarea>
                            {investmentTerms.length >= 64000 && <small className="text-danger">Maximum 64,000 characters allowed. If your terms are longer, please summarize them.</small>}
                            {errors.sdInvestmentTerms && <small className="text-danger">{errors.sdInvestmentTerms.message}</small>}
                        </div>
                    </div>
                </div>

                <div className="form-step" style={{ display: currentStep === 3 ? 'block' : 'none' }}>
                    <h4 className="mb-4">Security Information</h4>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label>Quantity <span className="text-danger">*</span></label>
                            <input type="number" className="form-control" {...register("sdQuantity")} />
                            {errors.sdQuantity && <small className="text-danger">{errors.sdQuantity.message}</small>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Last Known Transaction Price <span className="text-danger">*</span></label>
                            <input type="number" className="form-control" {...register("sdLastKnownPrice")} />
                            {errors.sdLastKnownPrice && <small className="text-danger">{errors.sdLastKnownPrice.message}</small>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Ask Price – Minimum <span className="text-danger">*</span></label>
                            <input type="number" className="form-control" {...register("sdAskPriceMin")} />
                            {errors.sdAskPriceMin && <small className="text-danger">{errors.sdAskPriceMin.message}</small>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Ask Price – Expected <span className="text-danger">*</span></label>
                            <input type="number" className="form-control" {...register("sdAskPriceExpected")} />
                            {errors.sdAskPriceExpected && <small className="text-danger">{errors.sdAskPriceExpected.message}</small>}
                        </div>
                    </div>
                </div>

                <div className="form-step" style={{ display: currentStep === 4 ? 'block' : 'none' }}>
                    <h4 className="mb-4">Upload Documents</h4>
                    <div className="row">
                        <div className="col-md-12 mb-4">
                            <label className="font-weight-bold">Share Certificate <span className="text-danger">*</span></label>
                            <div className="mt-2">
                                <Upload {...getUploadProps("sdShareCertificate", "Share Certificate")} accept=".pdf">
                                    <Button icon={<i className="fa-solid fa-cloud-arrow-up mr-2"></i>}>Select Document</Button>
                                </Upload>
                            </div>
                            {existingFiles.sdShareCertificate && <div className="text-success small mt-2"><i className="fa fa-check"></i> Document successfully uploaded</div>}
                        </div>
                        <div className="col-md-12 mb-4">
                            <label className="font-weight-bold">Executed SHA <span className="text-danger">*</span></label>
                            <div className="mt-2">
                                <Upload {...getUploadProps("sdExecutedSha", "Executed SHA")} accept=".pdf">
                                    <Button icon={<i className="fa-solid fa-cloud-arrow-up mr-2"></i>}>Select Document</Button>
                                </Upload>
                            </div>
                            {existingFiles.sdExecutedSha && <div className="text-success small mt-2"><i className="fa fa-check"></i> Document successfully uploaded</div>}
                        </div>
                        <div className="col-md-12 mb-4">
                            <label className="font-weight-bold">DOA (if applicable)</label>
                            <div className="mt-2">
                                <Upload {...getUploadProps("sdDoa", "DOA")} accept=".pdf">
                                    <Button icon={<i className="fa-solid fa-cloud-arrow-up mr-2"></i>}>Select Document</Button>
                                </Upload>
                            </div>
                            {existingFiles.sdDoa && (
                                <div className="text-success small mt-2 d-flex align-items-center">
                                    <i className="fa fa-check mr-2" style={{ marginRight: "4px" }}></i> Document successfully uploaded
                                    <Button type="text" danger size="small" style={{ marginLeft: "8px", padding: 0 }} onClick={() => setExistingFiles(prev => ({ ...prev, sdDoa: null }))}>
                                        <i className="fa fa-times"></i>
                                    </Button>
                                </div>
                            )}
                        </div>
                        <div className="col-md-12 mb-4">
                            <label className="font-weight-bold">Additional Document (Optional)</label>
                            <div className="mt-2">
                                <Upload {...getUploadProps("sdAdditionalDoc", "Additional Document")} accept=".pdf">
                                    <Button icon={<i className="fa-solid fa-cloud-arrow-up mr-2"></i>}>Select Document</Button>
                                </Upload>
                            </div>
                            {existingFiles.sdAdditionalDoc && (
                                <div className="text-success small mt-2 d-flex align-items-center">
                                    <i className="fa fa-check mr-2" style={{ marginRight: "4px" }}></i> Document successfully uploaded
                                    <Button type="text" danger size="small" style={{ marginLeft: "8px", padding: 0 }} onClick={() => setExistingFiles(prev => ({ ...prev, sdAdditionalDoc: null }))}>
                                        <i className="fa fa-times"></i>
                                    </Button>
                                </div>
                            )}
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
                                    <input type="checkbox" checked={isDemat} onChange={(e) => setValue("sdIsDemat", e.target.checked)} />
                                    <span className="slider"></span>
                                </label>
                            </div>
                        </div>
                        {isDemat && (
                            <>
                                <div className="col-md-6 mb-3">
                                    <label>DP Name <span className="text-danger">*</span></label>
                                    <input className="form-control" {...register("sdDpName")} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>DP ID <span className="text-danger">*</span></label>
                                    <input className="form-control" {...register("sdDpId")} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Client ID <span className="text-danger">*</span></label>
                                    <input className="form-control" {...register("sdClientId")} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>ISIN Number <span className="text-danger">*</span></label>
                                    <input className="form-control" {...register("sdIsinNumber")} />
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
                                <input type="checkbox" checked={hasPoa} onChange={(e) => setValue("sdHasPoa", e.target.checked)} />
                                <span className="slider"></span>
                            </label>
                        </div>
                        {hasPoa && (
                            <div className="mt-3">
                                <Upload {...getUploadProps("sdPoaDoc", "POA Document")} accept=".pdf">
                                    <Button icon={<i className="fa-solid fa-cloud-arrow-up mr-2"></i>}>Select Document</Button>
                                </Upload>
                                {existingFiles.sdPoaDoc && (
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
                        <input type="checkbox" id="declaration-checkbox" {...register("sdDeclare")} />
                        <label htmlFor="declaration-checkbox" className="declaration-label" style={{ fontWeight: "bold" }}>
                            I agree to the <a href="#!" onClick={(e) => { e.preventDefault(); setDeclarationModalVisible(true); }}>declarations</a> <span className="text-danger">*</span>
                        </label>
                    </div>
                    {errors.sdDeclare && <div className="text-danger mb-3">{errors.sdDeclare.message}</div>}

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
                        <div className="declaration-list" style={{ padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px", border: "1px solid #dee2e6" }}>
                            <ul style={{ paddingLeft: "20px", marginLeft: "20px", marginBottom: "0", fontSize: "15px", lineHeight: "1.6", color: "#333" }}>
                                <li style={{ display: "list-item", listStyleType: "disc", marginBottom: "12px" }}>I confirm that I am the lawful holder of the above-mentioned securities.</li>
                                <li style={{ display: "list-item", listStyleType: "disc", marginBottom: "12px" }}>I confirm that submission of this listing request does not violate any Shareholders’ Agreement, Articles of Association, investment agreement, lock-in provision, ROFO/ROFR obligation, or applicable law.</li>
                                <li style={{ display: "list-item", listStyleType: "disc", marginBottom: "12px" }}>I understand that listing on Growth91 does not guarantee finding a suitable buyer.</li>
                                <li style={{ display: "list-item", listStyleType: "disc", marginBottom: "12px" }}>I agree to cooperate with Growth91, the company, founders, legal advisors, and prospective buyers for verification and transaction facilitation purposes.</li>
                                <li style={{ display: "list-item", listStyleType: "disc", marginBottom: "12px" }}>I understand that all transactions are subject to applicable laws, company approvals, contractual rights, and due diligence.</li>
                                <li style={{ display: "list-item", listStyleType: "disc", marginBottom: "12px" }}>I agree to pay applicable fees, charges, and taxes as communicated by Growth91.</li>
                                <li style={{ display: "list-item", listStyleType: "disc", marginBottom: "0" }}>I agree to indemnify Growth91, its affiliates, directors, employees, representatives, and associates against any loss, claim, dispute, liability, or regulatory action arising from incorrect information, breach of agreements, or unauthorized sale attempt.</li>
                            </ul>
                        </div>
                    </Modal>
                </div>
            </>
        );
    };

    const stepsList = ["Basic Info", "Company Info", "Security Details", "Security Info", "Documents", "Demat Info", "Declaration"];

    const editListing = (record) => {
        setListingId(record.sdSdID);
        setCurrentListingStatus(record.sdStatus);

        // First, start with standard defaults (from local storage)
        const baseValues = {
            sdUserName: secureStorage.getItem("investor_name") || "",
            sdUserEmail: secureStorage.getItem("investor_email") || "",
            sdUserMobile: investorProfile.mobile || "",
            sdInvestorName: "",
            sdPanNumber: investorProfile.pan || "",
            sdPanName: investorProfile.pan_name || "",
            sdResidentialStatus: "Resident Indian",
            sdLegalName: "",
            sdStartupName: "", sdYearOfInvestment: "", sdInstrumentType: "Equity Shares",
            sdInvestmentTerms: "", sdQuantity: "", sdLastKnownPrice: "",
            sdAskPriceMin: "", sdAskPriceExpected: "", sdDpName: "",
            sdDpId: "", sdClientId: "", sdIsinNumber: "", sdDeclare: false, sdHasPoa: false, sdIsDemat: false
        };

        // Overlay whatever is actually saved in the DB record
        Object.keys(record).forEach(key => {
            if (record[key] !== null && record[key] !== "") {
                if (key === "sdIsDemat" || key === "sdHasPoa" || key === "sdDeclare") {
                    baseValues[key] = (record[key] == 1 || record[key] === true);
                } else {
                    baseValues[key] = record[key];
                }
            }
        });

        // Reset the form with the combined values
        reset(baseValues);

        setExistingFiles({
            sdShareCertificate: record.sdShareCertificate,
            sdExecutedSha: record.sdExecutedSha,
            sdDoa: record.sdDoa,
            sdPoaDoc: record.sdPoaDoc,
            sdAdditionalDoc: record.sdAdditionalDoc
        });

        setFiles({});
        setCurrentStep(0);
        setHighestStepReached(stepsList.length - 1);
        setViewMode("form");
    };

    const deleteDraft = async (tempId) => {
        try {
            const response = await Bridge.deleteSellerListingDraft({ sdSdID: tempId });
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
        { title: "Legal Name", dataIndex: "sdLegalName", key: "sdLegalName" },
        { title: "Startup Name", dataIndex: "sdStartupName", key: "sdStartupName" },
        {
            title: "Status", dataIndex: "sdStatus", key: "sdStatus", render: (status, record) => {
                let displayStatus = status === "On Hold" ? "Under Review" : status;
                let color = "blue";
                if (displayStatus === "Approved") color = "green";
                if (displayStatus === "Rejected") color = "red";
                if (displayStatus === "Draft" || displayStatus === "Additional Information Required") color = "orange";
                return (
                    <div className="text-left">
                        <Tag color={color}>{displayStatus}</Tag>
                        {displayStatus === "Additional Information Required" && record.sdAdditionalInfoReqText && (
                            <div className="mt-1">
                                <Button type="link" size="small" style={{ padding: 0 }} onClick={() => { setInfoModalVisible(true); setSelectedInfoText(record.sdAdditionalInfoReqText); }}>
                                    View Info
                                </Button>
                            </div>
                        )}
                    </div>
                );
            }
        },
        {
            title: "Submit Date",
            key: "date",
            render: (_, record) => {
                if (record.sdStatus === "Draft") return "-";
                const dateStr = record.sdPublishedAt || record.sdCreatedAt;
                return dateStr ? new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(dateStr.replace(' ', 'T'))).replace(/ ([0-9]{4})$/, ', $1') : '-';
            }
        },
        {
            title: "Action", key: "action", render: (_, record) => {
                const canEdit = ["Draft", "Under Review", "Additional Information Required", "Approved", "Rejected", "On Hold"].includes(record.sdStatus);
                
                const isDraft = record.sdStatus === "Draft";
                const canDelete = isDraft;

                return (
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {canEdit && <Button size="small" type="primary" onClick={() => editListing(record)}>Edit</Button>}
                        {canDelete && (
                            <Popconfirm
                                title="Delete Draft"
                                description="Are you sure you want to delete this draft?"
                                onConfirm={() => deleteDraft(record.sdSdID)}
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
        <>
            <div className="newabout">
                <Header newabout={"newabout"} />
            </div>

            <div className="row" style={{ margin: 0, backgroundColor: "#f4f5f7" }}>
                <div
                    className="hiw-nav col-md-2 col-12 py-3 px-0 sidebar2 collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    {isInvestor ? <MobileSidebar /> : isFounder ? <FounderSidebar /> : <MobileSidebar />}
                </div>
                <div className="hiw-nav col-md-2 col-12 py-3 px-0 d-lg-block d-none">
                    {isInvestor ? <DesktopSidebar /> : isFounder ? <FounderSidebar /> : <DesktopSidebar />}
                </div>

                <div className="col col-lg-10 pb-4">
                    <div className="seller-listing-wrapper" style={{ minHeight: "100vh" }}>
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
                                        sdUserName: secureStorage.getItem("investor_name") || "",
                                        sdUserEmail: secureStorage.getItem("investor_email") || "",
                                        sdUserMobile: investorProfile.mobile || "",
                                        sdInvestorName: "",
                                        sdPanNumber: investorProfile.pan || "",
                                        sdPanName: investorProfile.pan_name || "",
                                        sdResidentialStatus: "Resident Indian",
                                        sdLegalName: "",
                                        sdStartupName: "", sdYearOfInvestment: "", sdInstrumentType: "Equity Shares",
                                        sdInvestmentTerms: "", sdQuantity: "", sdLastKnownPrice: "",
                                        sdAskPriceMin: "", sdAskPriceExpected: "", sdDpName: "",
                                        sdDpId: "", sdClientId: "", sdIsinNumber: "", sdDeclare: false, sdHasPoa: false, sdIsDemat: false
                                    });

                                    try {
                                        const res = await Bridge.initSellerListingDraft({
                                            sdUserId: secureStorage.getItem("investor_id")
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
                                    setCurrentListingStatus("Draft");
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
                                rowKey="sdSdID"
                                loading={fetchingListings}
                                pagination={{ pageSize: 10 }}
                                scroll={{ x: 'max-content' }}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="container py-5 mt-5">
                          <div className="mb-4">
                              <Button type="link" onClick={() => { fetchListings(); setViewMode("table"); }} style={{ padding: 0 }}>
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
                                                    setHighestStepReached((prev) => Math.max(prev, index));
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
                                                        {currentListingStatus === "Draft" && (
                                                            <button
                                                                type="button"
                                                                className="btn-draft"
                                                                style={{ marginRight: '16px' }}
                                                                onClick={handleSaveDraftAndExit}
                                                            >
                                                                Save Draft
                                                            </button>
                                                        )}

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
                    </div>
                </div>
            </div>
            <NewWebFooter />
            <Modal
                title="Additional Information Required"
                open={infoModalVisible}
                footer={[
                    <Button key="close" onClick={() => setInfoModalVisible(false)}>Close</Button>
                ]}
                onCancel={() => setInfoModalVisible(false)}
            >
                <p style={{ whiteSpace: "pre-wrap" }}>{selectedInfoText}</p>
            </Modal>
        </>
    );
};
