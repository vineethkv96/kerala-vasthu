import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { loadPreferences, persistPreferences } from "./lib/storage";

export type Language = "en" | "ml";

const ml: Record<string, string> = {
  // Navigation
  Home: "ഹോം",
  "Room Size": "മുറിയുടെ വലുപ്പം",
  Ayadi: "ആയാദി",
  Converter: "കൺവെർട്ടർ",
  Reference: "റഫറൻസ്",
  Saved: "സംരക്ഷിച്ചവ",

  // Header
  "Kerala Vasthu Calculator": "കേരള വാസ്തു കാൽക്കുലേറ്റർ",
  "Kol · Viral · Ayadi": "കോൽ · വിരൽ · ആയാദി",
  "Toggle language": "ഭാഷ മാറ്റുക",
  "Buy me a coffee": "എനിക്ക് ഒരു കാപ്പി വാങ്ങിത്തരൂ",
  GitHub: "ഗിറ്റ്ഹബ്",
  "View on GitHub": "ഗിറ്റ്ഹബിൽ കാണുക",
  "Open for contributions": "സംഭാവനകൾക്കായി തുറന്നിരിക്കുന്നു",

  // Sidebar
  "Traditional Kerala Vasthu guidance. Not a substitute for engineering or legal approval.":
    "പരമ്പരാഗത കേരള വാസ്തു മാർഗ്ഗനിർദ്ദേശം. എഞ്ചിനീയറിംഗിനോ നിയമപരമായ അംഗീകാരത്തിനോ പകരമല്ല.",

  // Home
  "Plan room dimensions using Kol, Viral, feet, metres and traditional Ayadi guidance.":
    "കോൽ, വിരൽ, അടി, മീറ്റർ, പരമ്പരാഗത ആയാദി മാർഗ്ഗനിർദ്ദേശം എന്നിവ ഉപയോഗിച്ച് മുറികളുടെ അളവുകൾ ആസൂത്രണം ചെയ്യുക.",
  "Calculate Room Size": "മുറിയുടെ വലുപ്പം കണക്കാക്കുക",
  "Enter room dimensions and see Kol, Viral, feet and metres.":
    "മുറിയുടെ അളവുകൾ നൽകി കോൽ, വിരൽ, അടി, മീറ്റർ എന്നിവ കാണുക.",
  "Check Ayadi": "ആയാദി പരിശോധിക്കുക",
  "Run traditional Ayadi calculations with transparent formulas.":
    "സുതാര്യമായ സൂത്രവാക്യങ്ങൾ ഉപയോഗിച്ച് പരമ്പരാഗത ആയാദി കണക്കുകൂട്ടലുകൾ നടത്തുക.",
  "Convert Units": "യൂണിറ്റുകൾ മാറ്റുക",
  "Convert between Kol, Viral, feet, metres and centimetres.":
    "കോൽ, വിരൽ, അടി, മീറ്റർ, സെൻ്റിമീറ്റർ എന്നിവയ്ക്കിടയിൽ മാറ്റുക.",
  "View Traditional Measurements": "പരമ്പരാഗത അളവുകൾ കാണുക",
  "Learn Kerala traditional units and their equivalents.":
    "കേരള പരമ്പരാഗത യൂണിറ്റുകളും അവയുടെ തുല്യതകളും അറിയുക.",
  "How it works": "ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു",
  "Enter room dimensions in any supported unit.":
    "ഏതെങ്കിലും പിന്തുണയ്ക്കുന്ന യൂണിറ്റിൽ മുറിയുടെ അളവുകൾ നൽകുക.",
  "Convert the dimensions to Kol and Viral.":
    "അളവുകൾ കോലിലേക്കും വിരലിലേക്കും മാറ്റുക.",
  "Check traditional Ayadi values.":
    "പരമ്പരാഗത ആയാദി മൂല്യങ്ങൾ പരിശോധിക്കുക.",
  "Review suggested compatible dimensions.":
    "നിർദ്ദേശിച്ച അനുയോജ്യമായ അളവുകൾ അവലോകനം ചെയ്യുക.",
  "This tool provides traditional Kerala Vasthu calculation guidance for planning purposes. Consult a qualified Kerala Vasthu expert, architect, and structural engineer before finalizing a building plan.":
    "ആസൂത്രണ ആവശ്യങ്ങൾക്കായി പരമ്പരാഗത കേരള വാസ്തു കണക്കുകൂട്ടൽ മാർഗ്ഗനിർദ്ദേശം ഈ ഉപകരണം നൽകുന്നു. കെട്ടിട പദ്ധതി അന്തിമമാക്കുന്നതിന് മുമ്പ് യോഗ്യതയുള്ള കേരള വാസ്തു വിദഗ്ധൻ, ആർക്കിടെക്റ്റ്, സ്ട്രക്ചറൽ എഞ്ചിനീയർ എന്നിവരെ സമീപിക്കുക.",
  "Planning guidance only": "ആസൂത്രണ മാർഗ്ഗനിർദ്ദേശം മാത്രം",

  // Shared UI
  Copy: "പകർത്തുക",
  Copied: "പകർത്തി",
  Save: "സംരക്ഷിക്കുക",
  Cancel: "റദ്ദാക്കുക",
  Close: "അടയ്ക്കുക",
  Edit: "തിരുത്തുക",
  Done: "പൂർത്തിയായി",
  Delete: "ഇല്ലാതാക്കുക",
  Duplicate: "പകർപ്പെടുക്കുക",
  Print: "പ്രിൻ്റ്",
  Reset: "പുനഃസജ്ജമാക്കുക",

  // Units
  Kol: "കോൽ",
  Viral: "വിരൽ",
  Feet: "അടി",
  Inches: "ഇഞ്ച്",
  Centimetres: "സെൻ്റിമീറ്റർ",
  Metres: "മീറ്റർ",
  Millimetres: "മില്ലിമീറ്റർ",
  "Feet & inches": "അടി & ഇഞ്ച്",
  "Kol & Viral": "കോൽ & വിരൽ",
  "Kol + Viral": "കോൽ + വിരൽ",
  "Square feet": "ചതുരശ്ര അടി",
  "Square metres": "ചതുരശ്ര മീറ്റർ",
  "Square centimetres": "ചതുരശ്ര സെൻ്റിമീറ്റർ",

  // Room types
  Bedroom: "കിടപ്പുമുറി",
  "Living Room": "സ്വീകരണമുറി",
  Kitchen: "അടുക്കള",
  "Dining Room": "ഊണുമുറി",
  "Pooja Room": "പൂജാമുറി",
  "Study Room": "പഠനമുറി",
  Bathroom: "കുളിമുറി",
  "Store Room": "സ്റ്റോർ റൂം",
  Balcony: "ബാൽക്കണി",
  "Custom Room": "ഇഷ്ടാനുസൃത മുറി",

  // Room calculator
  "Room Size Calculator": "മുറിയുടെ വലുപ്പ കാൽക്കുലേറ്റർ",
  "Enter dimensions and see Kol, Viral, feet, metres, area and traditional alignment instantly.":
    "അളവുകൾ നൽകി കോൽ, വിരൽ, അടി, മീറ്റർ, വിസ്തീർണ്ണം, പരമ്പരാഗത വിന്യാസം എന്നിവ തൽക്ഷണം കാണുക.",
  "Room name or type": "മുറിയുടെ പേര് അല്ലെങ്കിൽ തരം",
  Length: "നീളം",
  Width: "വീതി",
  "Height (optional)": "ഉയരം (ഐച്ഛികം)",
  "Include height": "ഉയരം ഉൾപ്പെടുത്തുക",
  "Save Calculation": "കണക്കുകൂട്ടൽ സംരക്ഷിക്കുക",
  "Traditional Dimension Check": "പരമ്പരാഗത അളവ് പരിശോധന",
  Tolerance: "സഹിഷ്ണുത",
  Strict: "കർശനം",
  Practical: "പ്രായോഗികം",
  Flexible: "വഴക്കമുള്ള",
  "Strict (exact traditional unit only)": "കർശനം (കൃത്യമായ പരമ്പരാഗത യൂണിറ്റ് മാത്രം)",
  "Practical (within 1 Viral / 3 cm)": "പ്രായോഗികം (1 വിരൽ / 3 സെ.മീ. പരിധിയിൽ)",
  "Flexible (within 2 Viral / 6 cm)": "വഴക്കമുള്ള (2 വിരൽ / 6 സെ.മീ. പരിധിയിൽ)",
  Area: "വിസ്തീർണ്ണം",
  Perimeter: "ചുറ്റളവ്",
  "Room recommendation reference": "മുറി ശുപാർശ റഫറൻസ്",
  "General planning reference — not a mandatory Vasthu rule.":
    "പൊതു ആസൂത്രണ റഫറൻസ് — നിർബന്ധമായ വാസ്തു നിയമമല്ല.",
  "Room sizes are general planning guidance only. Confirm structural safety and local building rules with a qualified architect or engineer.":
    "മുറിയുടെ വലുപ്പങ്ങൾ പൊതു ആസൂത്രണ മാർഗ്ഗനിർദ്ദേശം മാത്രമാണ്. യോഗ്യതയുള്ള ആർക്കിടെക്റ്റ് അല്ലെങ്കിൽ എഞ്ചിനീയറുമായി ഘടനാപരമായ സുരക്ഷയും പ്രാദേശിക കെട്ടിട നിയമങ്ങളും സ്ഥിരീകരിക്കുക.",

  // Ayadi
  "Ayadi Calculator": "ആയാദി കാൽക്കുലേറ്റർ",
  "Traditional proportional calculations with transparent, configurable formulas.":
    "സുതാര്യവും ക്രമീകരിക്കാവുന്നതുമായ സൂത്രവാക്യങ്ങൾ ഉപയോഗിച്ചുള്ള പരമ്പരാഗത അനുപാത കണക്കുകൂട്ടലുകൾ.",
  "Calculation basis": "കണക്കുകൂട്ടൽ അടിസ്ഥാനം",
  "Length only": "നീളം മാത്രം",
  "Width only": "വീതി മാത്രം",
  "Custom Ayadi Base Value": "ഇഷ്ടാനുസൃത ആയാദി അടിസ്ഥാന മൂല്യം",
  "Traditional base unit": "പരമ്പരാഗത അടിസ്ഥാന യൂണിറ്റ്",
  "Rounding approach": "റൗണ്ടിംഗ് രീതി",
  "Nearest Viral": "ഏറ്റവും അടുത്ത വിരൽ",
  "Exact Viral value": "കൃത്യമായ വിരൽ മൂല്യം",
  "Floored to Viral": "വിരലിലേക്ക് താഴ്ത്തുക",
  "Ceiled to Viral": "വിരലിലേക്ക് ഉയർത്തുക",
  "Custom Ayadi base value": "ഇഷ്ടാനുസൃത ആയാദി അടിസ്ഥാന മൂല്യം",
  "Ayadi Formula Settings": "ആയാദി സൂത്രവാക്യ ക്രമീകരണങ്ങൾ",
  "Reset to defaults": "ഡിഫോൾട്ടിലേക്ക് പുനഃസജ്ജമാക്കുക",
  "Edit divisors, multipliers, labels and interpretation values. Formulas vary by Kerala Vasthu tradition.":
    "ഡിവൈസറുകൾ, ഗുണിതങ്ങൾ, ലേബലുകൾ, വ്യാഖ്യാന മൂല്യങ്ങൾ എന്നിവ തിരുത്തുക. സൂത്രവാക്യങ്ങൾ കേരള വാസ്തു പാരമ്പര്യമനുസരിച്ച് വ്യത്യാസപ്പെടുന്നു.",
  Multiplier: "ഗുണിതം",
  Divisor: "ഡിവൈസർ",
  "Output label": "ഔട്ട്പുട്ട് ലേബൽ",
  "Interpretation labels (comma-separated, one per remainder)":
    "വ്യാഖ്യാന ലേബലുകൾ (കോമയാൽ വേർതിരിച്ച്, ഓരോ ശിഷ്ടത്തിനും ഒന്ന്)",
  "Converted base value used in calculation":
    "കണക്കുകൂട്ടലിൽ ഉപയോഗിക്കുന്ന പരിവർത്തനം ചെയ്ത അടിസ്ഥാന മൂല്യം",
  "This calculation uses a fractional Viral value.":
    "ഈ കണക്കുകൂട്ടൽ ഭിന്ന സംഖ്യയായ വിരൽ മൂല്യം ഉപയോഗിക്കുന്നു.",
  Summary: "സംഗ്രഹം",
  "Aaya value": "ആയ മൂല്യം",
  "Vyaya value": "വ്യയ മൂല്യം",
  "Aaya versus Vyaya": "ആയ vs വ്യയ",
  "Aaya is greater than Vyaya": "ആയ വ്യയയേക്കാൾ വലുതാണ്",
  "Vyaya is greater than Aaya": "വ്യയ ആയയേക്കാൾ വലുതാണ്",
  "Aaya and Vyaya are equal": "ആയയും വ്യയയും തുല്യമാണ്",
  "Some traditions consider Aaya greater than Vyaya favourable. Interpretations can differ, so use this result as a consultation aid rather than a final decision.":
    "ചില പാരമ്പര്യങ്ങളിൽ ആയ വ്യയയേക്കാൾ വലുതാകുന്നത് അനുകൂലമായി കണക്കാക്കുന്നു. വ്യാഖ്യാനങ്ങൾ വ്യത്യാസപ്പെടാം, അതിനാൽ അന്തിമ തീരുമാനത്തിനു പകരം കൺസൾട്ടേഷൻ സഹായമായി മാത്രം ഈ ഫലം ഉപയോഗിക്കുക.",
  "Calculation Details": "കണക്കുകൂട്ടൽ വിശദാംശങ്ങൾ",
  "Original dimensions": "യഥാർത്ഥ അളവുകൾ",
  "Formula steps": "സൂത്രവാക്യ ഘട്ടങ്ങൾ",
  "Formula preset": "സൂത്രവാക്യ പ്രീസെറ്റ്",
  "Date and time": "തീയതിയും സമയവും",
  Factor: "ഘടകം",
  Formula: "സൂത്രവാക്യം",
  "Base Value": "അടിസ്ഥാന മൂല്യം",
  "Traditional Label": "പരമ്പരാഗത ലേബൽ",
  Notes: "കുറിപ്പുകൾ",
  Remainder: "ശിഷ്ടം",
  "Aaya remainder": "ആയ ശിഷ്ടം",
  "Vyaya remainder": "വ്യയ ശിഷ്ടം",
  "Yoni remainder": "യോനി ശിഷ്ടം",
  "Nakshatra remainder": "നക്ഷത്ര ശിഷ്ടം",
  "Vara remainder": "വാര ശിഷ്ടം",
  "Tithi remainder": "തിഥി ശിഷ്ടം",
  "Amsa remainder": "അംശ ശിഷ്ടം",
  Aaya: "ആയ",
  Vyaya: "വ്യയ",
  Yoni: "യോനി",
  "Rksha / Nakshatra": "ഋക്ഷ / നക്ഷത്ര",
  Vara: "വാര",
  Tithi: "തിഥി",
  Amsa: "അംശ",
  "Ayadi formulas and interpretations vary by Kerala Vasthu tradition, region, lineage, and consultant. Verify the preferred local tradition with a qualified Vasthu consultant. No result is guaranteed or absolute.":
    "ആയാദി സൂത്രവാക്യങ്ങളും വ്യാഖ്യാനങ്ങളും കേരള വാസ്തു പാരമ്പര്യം, പ്രദേശം, വംശപരമ്പര, കൺസൾട്ടൻ്റ് എന്നിവയനുസരിച്ച് വ്യത്യാസപ്പെടുന്നു. യോഗ്യതയുള്ള വാസ്തു കൺസൾട്ടൻ്റുമായി പ്രാദേശിക പാരമ്പര്യം സ്ഥിരീകരിക്കുക. ഒരു ഫലവും ഉറപ്പുള്ളതോ സമ്പൂർണ്ണമോ അല്ല.",

  // Unit converter
  "Unit Converter": "യൂണിറ്റ് കൺവെർട്ടർ",
  "Convert between Kol, Viral, feet, metres, centimetres and more.":
    "കോൽ, വിരൽ, അടി, മീറ്റർ, സെൻ്റിമീറ്റർ എന്നിവയും മറ്റും തമ്മിൽ മാറ്റുക.",
  "Single-value converter": "ഒറ്റ മൂല്യ കൺവെർട്ടർ",
  Value: "മൂല്യം",
  From: "ഇതിൽ നിന്ന്",
  To: "ഇതിലേക്ക്",
  Result: "ഫലം",
  "Swap units": "യൂണിറ്റുകൾ മാറ്റുക",
  "Quick conversions": "പെട്ടെന്നുള്ള മാറ്റങ്ങൾ",
  "Feet and metre quick calculator": "അടി, മീറ്റർ പെട്ടെന്നുള്ള കാൽക്കുലേറ്റർ",
  Conversion: "മാറ്റം",
  "Combined Kol + Viral": "സംയോജിത കോൽ + വിരൽ",
  "Feet to metres": "അടി → മീറ്റർ",
  "Metres to feet": "മീറ്റർ → അടി",
  "Feet to centimetres": "അടി → സെൻ്റിമീറ്റർ",
  "Centimetres to feet": "സെൻ്റിമീറ്റർ → അടി",
  "Feet to Kol": "അടി → കോൽ",
  "Kol to feet": "കോൽ → അടി",
  "Kol to metres": "കോൽ → മീറ്റർ",
  "Metres to Kol": "മീറ്റർ → കോൽ",
  "Viral to centimetres": "വിരൽ → സെൻ്റിമീറ്റർ",
  "Centimetres to Viral": "സെൻ്റിമീറ്റർ → വിരൽ",
  "Kol + Viral to centimetres": "കോൽ + വിരൽ → സെൻ്റിമീറ്റർ",
  "Centimetres to Kol + Viral": "സെൻ്റിമീറ്റർ → കോൽ + വിരൽ",
  "Value (feet & inches)": "മൂല്യം (അടി & ഇഞ്ച്)",
  "Value (Kol & Viral)": "മൂല്യം (കോൽ & വിരൽ)",
  "Feet & inches shown as a combined value.": "അടി & ഇഞ്ച് സംയോജിത മൂല്യമായി കാണിക്കുന്നു.",
  "Shown as a combined Kol + Viral value.": "സംയോജിത കോൽ + വിരൽ മൂല്യമായി കാണിക്കുന്നു.",

  // Traditional reference
  "Traditional Reference": "പരമ്പരാഗത റഫറൻസ്",
  "Kerala traditional measurement units and their modern equivalents.":
    "കേരള പരമ്പരാഗത അളവ് യൂണിറ്റുകളും അവയുടെ ആധുനിക തുല്യതകളും.",
  "Basic Kerala traditional units": "അടിസ്ഥാന കേരള പരമ്പരാഗത യൂണിറ്റുകൾ",
  Unit: "യൂണിറ്റ്",
  "Traditional relationship": "പരമ്പരാഗത ബന്ധം",
  "Metric equivalent": "മെട്രിക് തുല്യത",
  "Imperial equivalent": "ഇംപീരിയൽ തുല്യത",
  "Base unit": "അടിസ്ഥാന യൂണിറ്റ്",
  "Quarter Kol": "കാൽ കോൽ",
  "Half Kol": "അര കോൽ",
  "One Kol": "ഒരു കോൽ",
  "Important notes": "പ്രധാന കുറിപ്പുകൾ",
  "Ayadi note": "ആയാദി കുറിപ്പ്",
  "Kerala traditional construction measurements can differ by locality, historical period, carpenter tradition, and Vasthu practitioner.":
    "കേരളത്തിലെ പരമ്പരാഗത നിർമ്മാണ അളവുകൾ പ്രദേശം, ചരിത്ര കാലഘട്ടം, ആശാരി പാരമ്പര്യം, വാസ്തു പ്രാക്ടീഷണർ എന്നിവയനുസരിച്ച് വ്യത്യാസപ്പെടാം.",
  "This application uses the working standard: 1 Viral = 3 cm and 1 Kol = 24 Viral = 72 cm.":
    "ഈ ആപ്ലിക്കേഷൻ പ്രവർത്തന മാനദണ്ഡമായി ഉപയോഗിക്കുന്നത്: 1 വിരൽ = 3 സെ.മീ., 1 കോൽ = 24 വിരൽ = 72 സെ.മീ.",
  "Modern building plans must comply with structural safety requirements, local municipality rules, Kerala building rules, electrical and plumbing requirements, ventilation, fire safety, and professional architectural guidance.":
    "ആധുനിക കെട്ടിട പദ്ധതികൾ ഘടനാപരമായ സുരക്ഷാ ആവശ്യകതകൾ, പ്രാദേശിക മുനിസിപ്പാലിറ്റി നിയമങ്ങൾ, കേരള കെട്ടിട നിയമങ്ങൾ, വൈദ്യുത, പ്ലംബിംഗ് ആവശ്യകതകൾ, വായുസഞ്ചാരം, അഗ്നി സുരക്ഷ, പ്രൊഫഷണൽ ആർക്കിടെക്ചറൽ മാർഗ്ഗനിർദ്ദേശം എന്നിവ പാലിക്കണം.",
  "Vasthu calculations should not replace engineering or legal approvals.":
    "വാസ്തു കണക്കുകൂട്ടലുകൾ എഞ്ചിനീയറിംഗിനോ നിയമപരമായ അംഗീകാരങ്ങൾക്കോ പകരമാകരുത്.",
  "Ayadi is a set of traditional numerical calculations used in some Indian architectural traditions.":
    "ചില ഇന്ത്യൻ വാസ്തുശാസ്ത്ര പാരമ്പര്യങ്ങളിൽ ഉപയോഗിക്കുന്ന പരമ്പരാഗത സംഖ്യാ കണക്കുകൂട്ടലുകളുടെ ഒരു കൂട്ടമാണ് ആയാദി.",
  "Different schools use different source dimensions, multipliers, divisors, and interpretation tables.":
    "വ്യത്യസ്ത സമ്പ്രദായങ്ങൾ വ്യത്യസ്ത ഉറവിട അളവുകൾ, ഗുണിതങ്ങൾ, ഡിവൈസറുകൾ, വ്യാഖ്യാന പട്ടികകൾ എന്നിവ ഉപയോഗിക്കുന്നു.",
  "The calculator should show formulas openly and make settings editable rather than treating one formula as universally correct.":
    "ഒരു സൂത്രവാക്യം സാർവത്രികമായി ശരിയെന്ന് കണക്കാക്കുന്നതിനു പകരം കാൽക്കുലേറ്റർ സൂത്രവാക്യങ്ങൾ തുറന്ന് കാണിക്കുകയും ക്രമീകരണങ്ങൾ തിരുത്താൻ അനുവദിക്കുകയും ചെയ്യണം.",

  // Saved calculations
  "Saved Calculations": "സംരക്ഷിച്ച കണക്കുകൂട്ടലുകൾ",
  "Stored locally in your browser.": "നിങ്ങളുടെ ബ്രൗസറിൽ പ്രാദേശികമായി സംരക്ഷിച്ചിരിക്കുന്നു.",
  "Export all (JSON)": "എല്ലാം കയറ്റുമതി ചെയ്യുക (JSON)",
  "Import JSON": "JSON ഇറക്കുമതി ചെയ്യുക",
  "No saved calculations yet": "ഇതുവരെ സംരക്ഷിച്ച കണക്കുകൂട്ടലുകളില്ല",
  "Save a room or Ayadi calculation and it will appear here, ready to reopen, duplicate, print, or export.":
    "ഒരു മുറി അല്ലെങ്കിൽ ആയാദി കണക്കുകൂട്ടൽ സംരക്ഷിക്കുക, അത് തുറക്കാനും പകർത്താനും പ്രിൻ്റ് ചെയ്യാനും കയറ്റുമതി ചെയ്യാനും തയ്യാറായി ഇവിടെ ദൃശ്യമാകും.",
  "Delete calculation": "കണക്കുകൂട്ടൽ ഇല്ലാതാക്കുക",
  "Print / Save PDF": "പ്രിൻ്റ് / PDF സംരക്ഷിക്കുക",
  "Download HTML": "HTML ഡൗൺലോഡ് ചെയ്യുക",
  "Save calculation": "കണക്കുകൂട്ടൽ സംരക്ഷിക്കുക",
  "Project name": "പദ്ധതിയുടെ പേര്",
  Note: "കുറിപ്പ്",

  // Traditional alignment verdicts
  "Exact whole Kol": "കൃത്യമായ പൂർണ്ണ കോൽ",
  "Exact whole Viral": "കൃത്യമായ പൂർണ്ണ വിരൽ",
  "Multiple of 12 Viral (half Kol)": "12 വിരലിന്റെ ഗുണിതം (അര കോൽ)",
  "Multiple of 6 Viral (quarter Kol)": "6 വിരലിന്റെ ഗുണിതം (കാൽ കോൽ)",
  "Not a clean traditional multiple": "വ്യക്തമായ പരമ്പരാഗത ഗുണിതമല്ല",
  "Multiple of 1 Viral": "1 വിരലിന്റെ ഗുണിതം",
  "Multiple of 6 Viral": "6 വിരലിന്റെ ഗുണിതം",
  "Multiple of 12 Viral": "12 വിരലിന്റെ ഗുണിതം",
  "Multiple of 24 Viral (1 Kol)": "24 വിരലിന്റെ ഗുണിതം (1 കോൽ)",
  Yes: "അതെ",
  No: "അല്ല",
  "Nearby traditional suggestions": "സമീപത്തുള്ള പരമ്പരാഗത നിർദ്ദേശങ്ങൾ",
  "Nearest whole Kol for": "ഏറ്റവും അടുത്ത പൂർണ്ണ കോൽ",
  "Nearest whole Viral for": "ഏറ്റവും അടുത്ത പൂർണ്ണ വിരൽ",
  "Dimensional alignment suggestion only — not a definitive Vasthu verdict.":
    "അളവ് വിന്യാസ നിർദ്ദേശം മാത്രം — കൃത്യമായ വാസ്തു വിധിയല്ല.",
  Room: "മുറി",
  Minimum: "കുറഞ്ഞത്",
  Maximum: "കൂടിയത്",
  "Rounded to nearest Viral": "ഏറ്റവും അടുത്ത വിരലിലേക്ക് റൗണ്ട് ചെയ്തത്",
  "This reference is educational guidance only. Always consult qualified professionals before planning construction.":
    "ഈ റഫറൻസ് വിദ്യാഭ്യാസ മാർഗ്ഗനിർദ്ദേശം മാത്രമാണ്. നിർമ്മാണം ആസൂത്രണം ചെയ്യുന്നതിന് മുമ്പ് യോഗ്യതയുള്ള വിദഗ്ധരെ സമീപിക്കുക.",
  "1 Kol": "1 കോൽ",
  "1 Viral": "1 വിരൽ",
  "1 metre": "1 മീറ്റർ",
  "1 foot": "1 അടി",
  "10 feet": "10 അടി",
  "100 cm": "100 സെ.മീ.",
};

interface I18n {
  lang: Language;
  setLang: (l: Language) => void;
  toggle: () => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18n | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    setLangState(loadPreferences().language);
  }, []);

  const setLang = (l: Language) => {
    setLangState(l);
    persistPreferences({ ...loadPreferences(), language: l });
  };

  const toggle = () => setLang(lang === "en" ? "ml" : "en");

  const t = (key: string) => (lang === "ml" ? ml[key] ?? key : key);

  const value: I18n = { lang, setLang, toggle, t };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18n {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within a LanguageProvider");
  return ctx;
}
