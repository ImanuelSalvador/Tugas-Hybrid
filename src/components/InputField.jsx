function InputField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  rightElement,
  error,
  helperText,
  id,
  required = false
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full text-left">
      {label && (
        <label 
          htmlFor={inputId}
          className="block font-medium text-sm text-on-surface mb-1.5"
        >
          {label}
        </label>
      )}

      <div className={`relative flex items-center bg-surface-container-lowest border rounded-2xl h-14 px-3.5 transition-all duration-200 ${
        error 
          ? "border-error focus-within:ring-4 focus-within:ring-error/15" 
          : "border-outline-variant/60 focus-within:border-primary-container focus-within:ring-4 focus-within:ring-primary-container/15"
      }`}>
        {icon && (
          <span className="material-symbols-outlined text-outline text-xl mr-2.5 shrink-0 transition-colors">
            {icon}
          </span>
        )}

        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full bg-transparent border-0 p-0 text-sm text-on-surface placeholder:text-outline-variant focus:ring-0 focus:outline-none"
        />

        {rightElement && (
          <div className="shrink-0 ml-1 flex items-center">
            {rightElement}
          </div>
        )}
      </div>

      {error ? (
        <p className="mt-1 text-xs text-error px-1 flex items-center gap-1">
          <span className="material-symbols-outlined text-xs">info</span>
          {error}
        </p>
      ) : helperText ? (
        <p className="mt-1 text-xs text-outline px-1">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

export default InputField;