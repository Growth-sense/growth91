import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function CountrySelect({ value, onChange }) {
  const [age, setAge] = React.useState("");
  const [defaultValue, setDefaultValue] = React.useState(0);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box>
      <FormControl
        sx={{
          // small width and height
          maxWidth: "110px",
        }}
      >
        <Select
          variant="standard"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value || defaultValue}
          label="Age"
          onChange={onChange}
          disableUnderline={true}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: 0,
              },
              "&:hover fieldset": {
                border: 0,
              },
              "&.Mui-focused fieldset": {
                border: 0,
              },
            },
            maxWidth: "110px",

            boxShadow: "none",
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
            width: "110px",

            // remove focus border
          }}
        >
          <MenuItem disabled value={0}>Country Code </MenuItem>
          <MenuItem value={93}>(+93) Afghanistan </MenuItem>
          <MenuItem value={"+358"}>(+358) Aland Islands </MenuItem>
          <MenuItem value={355}>(+355) Albania </MenuItem>
          <MenuItem value={213}>(+213) Algeria </MenuItem>
          <MenuItem value={1684}>(+1684) AmericanSamoa </MenuItem>
          <MenuItem value={376}>(+376) Andorra </MenuItem>
          <MenuItem value={244}>(+244) Angola </MenuItem>
          <MenuItem value={1264}>(+1264) Anguilla </MenuItem>
          <MenuItem value={"+672"}>(+672) Antarctica </MenuItem>
          <MenuItem value={1268}>(+1268) Antigua and Barbuda </MenuItem>
          <MenuItem value={"+54"}>(+54) Argentina </MenuItem>
          <MenuItem value={374}>(+374) Armenia </MenuItem>
          <MenuItem value={297}>(+297) Aruba </MenuItem>
          <MenuItem value={"+61"}>(+61) Australia </MenuItem>
          <MenuItem value={43}>(+43) Austria </MenuItem>
          <MenuItem value={994}>(+994) Azerbaijan </MenuItem>
          <MenuItem value={1242}>(+1242) Bahamas </MenuItem>
          <MenuItem value={973}>(+973) Bahrain </MenuItem>
          <MenuItem value={880}>(+880) Bangladesh </MenuItem>
          <MenuItem value={1246}>(+1246) Barbados </MenuItem>
          <MenuItem value={375}>(+375) Belarus </MenuItem>
          <MenuItem value={32}>(+32) Belgium </MenuItem>
          <MenuItem value={501}>(+501) Belize </MenuItem>
          <MenuItem value={229}>(+229) Benin </MenuItem>
          <MenuItem value={1441}>(+1441) Bermuda </MenuItem>
          <MenuItem value={975}>(+975) Bhutan </MenuItem>
          <MenuItem value={591}>
            (+591) Bolivia Plurinational State of{" "}
          </MenuItem>
          <MenuItem value={387}>(+387) Bosnia and Herzegovina </MenuItem>
          <MenuItem value={267}>(+267) Botswana </MenuItem>
          <MenuItem value={55}>(+55) Brazil </MenuItem>
          <MenuItem value={246}>
            (+246) British Indian Ocean Territory{" "}
          </MenuItem>
          <MenuItem value={673}>(+673) Brunei Darussalam </MenuItem>
          <MenuItem value={359}>(+359) Bulgaria </MenuItem>
          <MenuItem value={226}>(+226) Burkina Faso </MenuItem>
          <MenuItem value={257}>(+257) Burundi </MenuItem>
          <MenuItem value={855}>(+855) Cambodia </MenuItem>
          <MenuItem value={237}>(+237) Cameroon </MenuItem>
          <MenuItem value={"+1"}>(+1) Canada </MenuItem>
          <MenuItem value={238}>(+238) Cape Verde </MenuItem>
          <MenuItem value={345}>(+ 345) Cayman Islands </MenuItem>
          <MenuItem value={236}>(+236) Central African Republic </MenuItem>
          <MenuItem value={235}>(+235) Chad </MenuItem>
          <MenuItem value={56}>(+56) Chile </MenuItem>
          <MenuItem value={86}>(+86) China </MenuItem>
          <MenuItem value={" 61"}>(+61) Christmas Island </MenuItem>
          <MenuItem value={61}>(+61) Cocos (Keeling) Islands </MenuItem>
          <MenuItem value={57}>(+57) Colombia </MenuItem>
          <MenuItem value={269}>(+269) Comoros </MenuItem>
          <MenuItem value={242}>(+242) Congo </MenuItem>
          <MenuItem value={243}>
            (+243) Congo The Democratic Republic of the Congo{" "}
          </MenuItem>
          <MenuItem value={682}>(+682) Cook Islands </MenuItem>
          <MenuItem value={506}>(+506) Costa Rica </MenuItem>
          <MenuItem value={225}>(+225) Cote d'Ivoire </MenuItem>
          <MenuItem value={385}>(+385) Croatia </MenuItem>
          <MenuItem value={53}>(+53) Cuba </MenuItem>
          <MenuItem value={357}>(+357) Cyprus </MenuItem>
          <MenuItem value={420}>(+420) Czech Republic </MenuItem>
          <MenuItem value={45}>(+45) Denmark </MenuItem>
          <MenuItem value={253}>(+253) Djibouti </MenuItem>
          <MenuItem value={1767}>(+1767) Dominica </MenuItem>
          <MenuItem value={1849}>(+1849) Dominican Republic </MenuItem>
          <MenuItem value={593}>(+593) Ecuador </MenuItem>
          <MenuItem value={20}>(+20) Egypt </MenuItem>
          <MenuItem value={503}>(+503) El Salvador </MenuItem>
          <MenuItem value={240}>(+240) Equatorial Guinea </MenuItem>
          <MenuItem value={291}>(+291) Eritrea </MenuItem>
          <MenuItem value={372}>(+372) Estonia </MenuItem>
          <MenuItem value={251}>(+251) Ethiopia </MenuItem>
          <MenuItem value={500}>(+500) Falkland Islands (Malvinas) </MenuItem>
          <MenuItem value={298}>(+298) Faroe Islands </MenuItem>
          <MenuItem value={679}>(+679) Fiji </MenuItem>
          <MenuItem value={358}>(+358) Finland </MenuItem>
          <MenuItem value={33}>(+33) France </MenuItem>
          <MenuItem value={594}>(+594) French Guiana </MenuItem>
          <MenuItem value={689}>(+689) French Polynesia </MenuItem>
          <MenuItem value={241}>(+241) Gabon </MenuItem>
          <MenuItem value={220}>(+220) Gambia </MenuItem>
          <MenuItem value={995}>(+995) Georgia </MenuItem>
          <MenuItem value={49}>(+49) Germany </MenuItem>
          <MenuItem value={233}>(+233) Ghana </MenuItem>
          <MenuItem value={350}>(+350) Gibraltar </MenuItem>
          <MenuItem value={30}>(+30) Greece </MenuItem>
          <MenuItem value={299}>(+299) Greenland </MenuItem>
          <MenuItem value={1473}>(+1473) Grenada </MenuItem>
          <MenuItem value={"+590"}>(+590) Guadeloupe </MenuItem>
          <MenuItem value={1671}>(+1671) Guam </MenuItem>
          <MenuItem value={502}>(+502) Guatemala </MenuItem>
          <MenuItem value={" +44"}>(+44) Guernsey </MenuItem>
          <MenuItem value={224}>(+224) Guinea </MenuItem>
          <MenuItem value={245}>(+245) Guinea-Bissau </MenuItem>
          <MenuItem value={595}>(+595) Guyana </MenuItem>
          <MenuItem value={509}>(+509) Haiti </MenuItem>
          <MenuItem value={379}>(+379) Holy See (Vatican City State) </MenuItem>
          <MenuItem value={504}>(+504) Honduras </MenuItem>
          <MenuItem value={852}>(+852) Hong Kong </MenuItem>
          <MenuItem value={36}>(+36) Hungary </MenuItem>
          <MenuItem value={354}>(+354) Iceland </MenuItem>
          <MenuItem value={91}>(+91) India </MenuItem>
          <MenuItem value={62}>(+62) Indonesia </MenuItem>
          <MenuItem value={98}>
            (+98) Iran Islamic Republic of Persian Gulf{" "}
          </MenuItem>
          <MenuItem value={964}>(+964) Iraq </MenuItem>
          <MenuItem value={353}>(+353) Ireland </MenuItem>
          <MenuItem value={"+44"}>(+44) Isle of Man </MenuItem>
          <MenuItem value={972}>(+972) Israel </MenuItem>
          <MenuItem value={39}>(+39) Italy </MenuItem>
          <MenuItem value={1876}>(+1876) Jamaica </MenuItem>
          <MenuItem value={81}>(+81) Japan </MenuItem>
          <MenuItem value={44}>(+44) Jersey </MenuItem>
          <MenuItem value={962}>(+962) Jordan </MenuItem>
          <MenuItem value={77}>(+77) Kazakhstan </MenuItem>
          <MenuItem value={254}>(+254) Kenya </MenuItem>
          <MenuItem value={686}>(+686) Kiribati </MenuItem>
          <MenuItem value={850}>
            (+850) Korea Democratic People's Republic of Korea{" "}
          </MenuItem>
          <MenuItem value={82}>(+82) Korea Republic of South Korea </MenuItem>
          <MenuItem value={965}>(+965) Kuwait </MenuItem>
          <MenuItem value={996}>(+996) Kyrgyzstan </MenuItem>
          <MenuItem value={856}>(+856) Laos </MenuItem>
          <MenuItem value={371}>(+371) Latvia </MenuItem>
          <MenuItem value={961}>(+961) Lebanon </MenuItem>
          <MenuItem value={266}>(+266) Lesotho </MenuItem>
          <MenuItem value={231}>(+231) Liberia </MenuItem>
          <MenuItem value={218}>(+218) Libyan Arab Jamahiriya </MenuItem>
          <MenuItem value={423}>(+423) Liechtenstein </MenuItem>
          <MenuItem value={370}>(+370) Lithuania </MenuItem>
          <MenuItem value={352}>(+352) Luxembourg </MenuItem>
          <MenuItem value={853}>(+853) Macao </MenuItem>
          <MenuItem value={389}>(+389) Macedonia </MenuItem>
          <MenuItem value={261}>(+261) Madagascar </MenuItem>
          <MenuItem value={265}>(+265) Malawi </MenuItem>
          <MenuItem value={60}>(+60) Malaysia </MenuItem>
          <MenuItem value={960}>(+960) Maldives </MenuItem>
          <MenuItem value={223}>(+223) Mali </MenuItem>
          <MenuItem value={356}>(+356) Malta </MenuItem>
          <MenuItem value={692}>(+692) Marshall Islands </MenuItem>
          <MenuItem value={596}>(+596) Martinique </MenuItem>
          <MenuItem value={222}>(+222) Mauritania </MenuItem>
          <MenuItem value={230}>(+230) Mauritius </MenuItem>
          <MenuItem value={262}>(+262) Mayotte </MenuItem>
          <MenuItem value={52}>(+52) Mexico </MenuItem>
          <MenuItem value={691}>
            (+691) Micronesia Federated States of Micronesia{" "}
          </MenuItem>
          <MenuItem value={373}>(+373) Moldova </MenuItem>
          <MenuItem value={377}>(+377) Monaco </MenuItem>
          <MenuItem value={976}>(+976) Mongolia </MenuItem>
          <MenuItem value={382}>(+382) Montenegro </MenuItem>
          <MenuItem value={1664}>(+1664) Montserrat </MenuItem>
          <MenuItem value={212}>(+212) Morocco </MenuItem>
          <MenuItem value={258}>(+258) Mozambique </MenuItem>
          <MenuItem value={95}>(+95) Myanmar </MenuItem>
          <MenuItem value={264}>(+264) Namibia </MenuItem>
          <MenuItem value={674}>(+674) Nauru </MenuItem>
          <MenuItem value={977}>(+977) Nepal </MenuItem>
          <MenuItem value={31}>(+31) Netherlands </MenuItem>
          <MenuItem value={599}>(+599) Netherlands Antilles </MenuItem>
          <MenuItem value={687}>(+687) New Caledonia </MenuItem>
          <MenuItem value={64}>(+64) New Zealand </MenuItem>
          <MenuItem value={505}>(+505) Nicaragua </MenuItem>
          <MenuItem value={227}>(+227) Niger </MenuItem>
          <MenuItem value={234}>(+234) Nigeria </MenuItem>
          <MenuItem value={683}>(+683) Niue </MenuItem>
          <MenuItem value={672}>(+672) Norfolk Island </MenuItem>
          <MenuItem value={1670}>(+1670) Northern Mariana Islands </MenuItem>
          <MenuItem value={"+47"}>(+47) Norway </MenuItem>
          <MenuItem value={968}>(+968) Oman </MenuItem>
          <MenuItem value={92}>(+92) Pakistan </MenuItem>
          <MenuItem value={680}>(+680) Palau </MenuItem>
          <MenuItem value={970}>
            (+970) Palestinian Territory Occupied{" "}
          </MenuItem>
          <MenuItem value={507}>(+507) Panama </MenuItem>
          <MenuItem value={675}>(+675) Papua New Guinea </MenuItem>
          <MenuItem value={"+595"}>(+595) Paraguay </MenuItem>
          <MenuItem value={51}>(+51) Peru </MenuItem>
          <MenuItem value={63}>(+63) Philippines </MenuItem>
          <MenuItem value={872}>(+872) Pitcairn </MenuItem>
          <MenuItem value={48}>(+48) Poland </MenuItem>
          <MenuItem value={351}>(+351) Portugal </MenuItem>
          <MenuItem value={1939}>(+1939) Puerto Rico </MenuItem>
          <MenuItem value={974}>(+974) Qatar </MenuItem>
          <MenuItem value={40}>(+40) Romania </MenuItem>
          <MenuItem value={7}>(+7) Russia </MenuItem>
          <MenuItem value={250}>(+250) Rwanda </MenuItem>
          <MenuItem value={"+262"}>(+262) Reunion </MenuItem>
          <MenuItem value={" +590"}>(+590) Saint Barthelemy </MenuItem>
          <MenuItem value={290}>
            (+290) Saint Helena Ascension and Tristan Da Cunha{" "}
          </MenuItem>
          <MenuItem value={1869}>(+1869) Saint Kitts and Nevis </MenuItem>
          <MenuItem value={1758}>(+1758) Saint Lucia </MenuItem>
          <MenuItem value={590}>(+590) Saint Martin </MenuItem>
          <MenuItem value={508}>(+508) Saint Pierre and Miquelon </MenuItem>
          <MenuItem value={1784}>
            (+1784) Saint Vincent and the Grenadines{" "}
          </MenuItem>
          <MenuItem value={685}>(+685) Samoa </MenuItem>
          <MenuItem value={378}>(+378) San Marino </MenuItem>
          <MenuItem value={239}>(+239) Sao Tome and Principe </MenuItem>
          <MenuItem value={966}>(+966) Saudi Arabia </MenuItem>
          <MenuItem value={221}>(+221) Senegal </MenuItem>
          <MenuItem value={381}>(+381) Serbia </MenuItem>
          <MenuItem value={248}>(+248) Seychelles </MenuItem>
          <MenuItem value={232}>(+232) Sierra Leone </MenuItem>
          <MenuItem value={65}>(+65) Singapore </MenuItem>
          <MenuItem value={421}>(+421) Slovakia </MenuItem>
          <MenuItem value={386}>(+386) Slovenia </MenuItem>
          <MenuItem value={677}>(+677) Solomon Islands </MenuItem>
          <MenuItem value={252}>(+252) Somalia </MenuItem>
          <MenuItem value={27}>(+27) South Africa </MenuItem>
          <MenuItem value={211}>(+211) South Sudan </MenuItem>
          <MenuItem value={"+500"}>
            (+500) South Georgia and the South Sandwich Islands{" "}
          </MenuItem>
          <MenuItem value={34}>(+34) Spain </MenuItem>
          <MenuItem value={94}>(+94) Sri Lanka </MenuItem>
          <MenuItem value={249}>(+249) Sudan </MenuItem>
          <MenuItem value={597}>(+597) Suriname </MenuItem>
          <MenuItem value={47}>(+47) Svalbard and Jan Mayen </MenuItem>
          <MenuItem value={268}>(+268) Swaziland </MenuItem>
          <MenuItem value={46}>(+46) Sweden </MenuItem>
          <MenuItem value={41}>(+41) Switzerland </MenuItem>
          <MenuItem value={963}>(+963) Syrian Arab Republic </MenuItem>
          <MenuItem value={886}>(+886) Taiwan </MenuItem>
          <MenuItem value={992}>(+992) Tajikistan </MenuItem>
          <MenuItem value={255}>
            (+255) Tanzania United Republic of Tanzania{" "}
          </MenuItem>
          <MenuItem value={66}>(+66) Thailand </MenuItem>
          <MenuItem value={670}>(+670) Timor-Leste </MenuItem>
          <MenuItem value={228}>(+228) Togo </MenuItem>
          <MenuItem value={690}>(+690) Tokelau </MenuItem>
          <MenuItem value={676}>(+676) Tonga </MenuItem>
          <MenuItem value={1868}>(+1868) Trinidad and Tobago </MenuItem>
          <MenuItem value={216}>(+216) Tunisia </MenuItem>
          <MenuItem value={90}>(+90) Turkey </MenuItem>
          <MenuItem value={993}>(+993) Turkmenistan </MenuItem>
          <MenuItem value={1649}>(+1649) Turks and Caicos Islands </MenuItem>
          <MenuItem value={688}>(+688) Tuvalu </MenuItem>
          <MenuItem value={256}>(+256) Uganda </MenuItem>
          <MenuItem value={380}>(+380) Ukraine </MenuItem>
          <MenuItem value={971}>(+971) United Arab Emirates </MenuItem>
          <MenuItem value={"+44"}>(+44) United Kingdom </MenuItem>
          <MenuItem value={1}>(+1) United States </MenuItem>
          <MenuItem value={598}>(+598) Uruguay </MenuItem>
          <MenuItem value={998}>(+998) Uzbekistan </MenuItem>
          <MenuItem value={678}>(+678) Vanuatu </MenuItem>
          <MenuItem value={58}>
            (+58) Venezuela Bolivarian Republic of Venezuela{" "}
          </MenuItem>
          <MenuItem value={84}>(+84) Vietnam </MenuItem>
          <MenuItem value={1284}>(+1284) Virgin Islands British </MenuItem>
          <MenuItem value={1340}>(+1340) Virgin Islands U.S. </MenuItem>
          <MenuItem value={681}>(+681) Wallis and Futuna </MenuItem>
          <MenuItem value={967}>(+967) Yemen </MenuItem>
          <MenuItem value={260}>(+260) Zambia </MenuItem>
          <MenuItem value={263}>(+263) Zimbabwe </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
