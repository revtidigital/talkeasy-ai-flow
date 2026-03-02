import PhoneInput, { getCountryCallingCode } from "react-phone-number-input";
import type { Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { cn } from "@/lib/utils";

interface PhoneInputFieldProps {
  value: string;
  onChange: (value: string, countryName: string) => void;
  error?: string;
  variant?: "bordered" | "underline";
  className?: string;
}

const countryNames: Partial<Record<Country, string>> = {};

const getCountryName = (country: Country | undefined): string => {
  if (!country) return "";
  try {
    const name = new Intl.DisplayNames(["en"], { type: "region" }).of(country);
    return name || country;
  } catch {
    return country;
  }
};

const PhoneInputField = ({
  value,
  onChange,
  error,
  variant = "bordered",
  className,
}: PhoneInputFieldProps) => {
  const handleChange = (val: string | undefined) => {
    onChange(val || "", "");
  };

  const handleCountryChange = (country: Country | undefined) => {
    const name = getCountryName(country);
    onChange(value || "", name);
  };

  return (
    <div className={cn("phone-input-wrapper", variant, className)}>
      <PhoneInput
        international
        defaultCountry="IN"
        value={value}
        onChange={handleChange}
        onCountryChange={handleCountryChange}
        countryCallingCodeEditable={false}
        className={cn(
          "flex items-center w-full",
          error && "error"
        )}
      />
      {error && (
        <p className="text-xs text-destructive mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default PhoneInputField;
