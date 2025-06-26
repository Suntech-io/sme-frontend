'use client'


// Text Input
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useController } from "react-hook-form";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import "react-phone-number-input/style.css";
// "With country select" component.
import PhoneInputWithCountry from "react-phone-number-input";
import { Country } from "react-phone-number-input/react-hook-form";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

interface InputFormFieldProps {
  form: any;
  label?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  name: string;
  type?: HTMLInputTypeAttribute;
  className?: string;
  // Add a prop to pass through to the Input component
  inputProps?: React.ComponentProps<typeof Input>;
}

// General Input Form Field -----------------------------------------------------------------
export const InputFormField = ({
  form,
  label,
  placeholder,
  description,
  name,
  disabled = false,
  className,
  type = "text",
  inputProps = {},
}: InputFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <div className="">
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                placeholder={placeholder}
                className={`placeholder:text-xs disabled:bg-gray-300 disabled:border ${className}`}
                disabled={disabled}
                {...field}
                type={type}
                // Spread the inputProps onto the Input component
                {...inputProps}
              />
            </FormControl>
            <FormDescription>{description}</FormDescription>
            <FormMessage className="text-left -mt-2" />
          </FormItem>
        </div>
      )}
    />
  );
};

// General Input Form Field -----------------------------------------------------------------
export const TextAreaFormField = ({
  form,
  label,
  placeholder,
  description,
  name,
  disabled = false,
  className,
  type = "text",
  inputProps = {},
}: InputFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className={`placeholder:text-xs disabled:bg-gray-300 disabled:border ${className}`}
              disabled={disabled}
              {...field}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage className="text-left -mt-2" />
        </FormItem>
      )}
    />
  );
};

// Checkbox Form Field -----------------------------------------------------------------
export const CheckBoxFormField = ({
  form,
  label,
  description,
  name,
  disabled = false,
  className,
  inputProps = {},
}: InputFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              className={className}
              disabled={disabled}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage className="text-left -mt-2" />
        </FormItem>
      )}
    />
  );
};

// Radio Group Form Field -----------------------------------------------------------------
export const RadioGroupFormField = ({
  form,
  label,
  name,
  options,
  disabled = false,
  className,
}: InputFormFieldProps & { options: { label: string, value: string }[] }) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className={cn("flex flex-col space-y-1", className)}
              disabled={disabled}
            >
              {options.map((el) => (
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value={el.value} />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {el.label}
                  </FormLabel>
                </FormItem>
              ))
              }
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};


// Password Input Form Field ---------------------------------------------------------------
export const PasswordFormField = ({
  form,
  label,
  placeholder,
  description,
  name,
  disabled = false,
  className,
  inputProps = {},
}: InputFormFieldProps) => {
  const [type, settype] = useState<"password" | "text">("password");

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                placeholder={placeholder}
                className={`placeholder:text-xs disabled:bg-gray-300 disabled:border ${className}`}
                style={{ paddingRight: "25px" }}
                disabled={disabled}
                {...field}
                type={type}
                // Spread the inputProps onto the Input component
                {...inputProps}
              />
              <div className="iconToggler absolute right-0 top-1">
                {type == "password" && (
                  <IconifyIcon
                    icon="fluent:eye-16-filled"
                    onClick={() => {
                      settype("text");
                    }}
                  />
                )}
                {type == "text" && (
                  <IconifyIcon
                    icon="fluent:eye-off-16-filled"
                    onClick={() => {
                      settype("password");
                    }}
                  />
                )}
              </div>
            </div>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage className="text-left -mt-2" />
        </FormItem>
      )}
    />
  );
};


// Phone Number Input Form Field ------------------------------------------------------
// "With country select" component. USE THIS OVER THE OTHER ONE
interface PhoneNumberFormFieldProps {
  form: any;
  label?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  onlyCountries?: string[];
  name: string;
  className?: string;
  inputProps?: React.ComponentProps<typeof PhoneInput>;
}

export const PhoneNumberFormField = ({
  form,
  label,
  placeholder,
  description,
  name,
  onlyCountries,
  disabled = false,
  className,
  inputProps = {},
}: PhoneNumberFormFieldProps) => {
  const { field } = useController({
    name,
    control: form.control,
  });

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <PhoneInput
              {...field}
              country={"gh"}
              onlyCountries={onlyCountries}
              placeholder={placeholder}
              disabled={disabled}
              containerClass={className}
              inputClass="w-full"
              inputStyle={{
                width: "100%",
              }}
              enableSearch={true}
              inputProps={{
                ...inputProps,
                autoFocus: true,
                name: name,
                ref: field.ref,
              }}
              onChange={(value) => field.onChange("+" + value)}
              value={field.value}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage className="text-left -mt-2" />
        </FormItem>
      )}
    />
  );
};


// Still under construction**************
export const FormPhoneNumberField = ({
  form,
  label,
  placeholder,
  description,
  name,
  onlyCountries,
  disabled = false,
  className,
  inputProps = {},
}: PhoneNumberFormFieldProps) => {
  const { field } = useController({
    name,
    control: form.control,
  });

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <PhoneInputWithCountry
              {...field}
              addInternationalOption={false}
              defaultCountry="GH"
              countries={onlyCountries as Country[]}
              placeholder={placeholder}
              disabled={disabled}
              containerClass={className}
              enableSearch={true}
              control={form.control}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage className="text-left -mt-2" />
        </FormItem>
      )}
    />
  );
};


// Select Input Form Field ---------------------------------------------------------------
// Select Input Form Field using the react select library
import ReactSelect from "react-select";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HTMLInputTypeAttribute, useState } from "react";
import IconifyIcon from "./IconifyIcon";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup } from "@/components/ui/radio-group";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

interface SelectFormFieldProps {
  form: any;
  name?: string;
  options: { value: any; label: string }[];
  label?: string;
  showWatchValue?: boolean;
  className?: string;
  labelStyle?: string;
  selectStyle?: string;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export const ReactSelectFormField = ({
  form,
  name,
  options,
  label,
  showWatchValue = false,
  className,
  labelStyle,
  selectStyle,
  isLoading,
  disabled = false,
  placeholder,
}: SelectFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name!}
      render={({ field: { name, onBlur, onChange, ref } }) => (
        <FormItem className={className}>
          <FormLabel className={labelStyle}>{label}</FormLabel>
          <FormControl>
            <ReactSelect
              options={options}
              name={name}
              isDisabled={disabled}
              className={selectStyle}
              onBlur={onBlur}
              ref={ref}
              onChange={(e) => onChange(e && e.value)}
              isLoading={isLoading}
              placeholder={placeholder}
              value={form.watch(name) ?? undefined}
            />
          </FormControl>
          {showWatchValue && (
            <FormDescription className="pl-5">
              {form.watch(name)}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};


//Select Form field from shadcn ------------------------------------------------------------------------------------------------------------------------
// Select Form Field using the shadcn/ui library
export const SelectFormField = ({
  form,
  name,
  options,
  label,
  showWatchValue = false,
  className,
  labelStyle,
  selectStyle,
  disabled = false,
  placeholder,
}: SelectFormFieldProps) => {
  return (
    <div className="">
      <FormField
        control={form.control}
        name={name!}
        render={({ field }) => (
          <FormItem className={className}>
            <FormLabel className={labelStyle}>{label}</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={disabled}>
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      "w-full placeholder:text-xs disabled:bg-gray-300 disabled:border transition-colors duration-200",
                      selectStyle
                    )}
                  >
                    <SelectValue placeholder={placeholder || "Select a value"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
              <FormDescription className="pl-5">
                {form.watch(name!)}
              </FormDescription>
            <FormMessage className="text-left -mt-2" />
          </FormItem>
        )}
      />
    </div>
  );
};




// Date Picker Form Field ---------------------------------------------------------------
export function DatePickerFormField({
  form,
  name,
  label,
  description,
  className,
  disabled = false,
  placeholder,
}: InputFormFieldProps) {


  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col", className)}>
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01") || disabled
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormDescription>
            {description}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

// Date Range Picker Form Field ---------------------------------------------------------------
export function DateRangePickerFormField({
  form,
  name,
  label,
  description,
  className,
  disabled = false,
  placeholder,
}: InputFormFieldProps) {


  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !field.value.from && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value.from ? (
                    field.value.to ? (
                      <>
                        {format(field.value.from, 'LLL dd, y')} -{' '}
                        {format(field.value.to, 'LLL dd, y')}
                      </>
                    ) : (
                      format(field.value.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>{placeholder}</span>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={field.value.from}
                selected={field.value}
                onSelect={field.onChange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}


// Switch Form Field -----------------------------------------------------------------
export const SwitchFormField = ({
  form,
  label,
  description,
  name,
  disabled = false,
  className,
  inputProps = {},
}: InputFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              className={className}
              disabled={disabled}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage className="text-left -mt-2" />
        </FormItem>
      )}
    />
  );
}



// Switch Form Field -----------------------------------------------------------------
export const ComboboxFormField = ({
  form,
  label,
  placeholder,
  description,
  name,
  options,
  disabled = false,
  className,
  inputProps = {},
}: InputFormFieldProps & { options: { value: any; label: string }[] }) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[200px] justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? options.find(
                      (language) => language.value === field.value
                    )?.label
                    : placeholder}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search framework..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No Results found.</CommandEmpty>
                  <CommandGroup>
                    {options.map((option) => (
                      <CommandItem
                        value={option.label}
                        key={option.value}
                        onSelect={() => {
                          form.setValue(name, option.value)
                        }}
                      >
                        {option.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            option.value === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription>
            {description}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
