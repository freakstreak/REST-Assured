// Function to convert a string to kebab-case
function toKebabCase(str: string): string {
  const config = {
    conversionRules: {
      case: "lowercase",
      separator: "_",
    },
  };
  const { case: textCase, separator } = config.conversionRules;

  // Convert string to kebab-case
  let result = str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[\s_]+/g, separator);

  if (textCase === "lowercase") {
    result = result.toLowerCase();
  } else if (textCase === "uppercase") {
    result = result.toUpperCase();
  }

  return result;
}
