declare module "tailwindcss/lib/util/flattenColorPalette" {
  function flattenColorPalette(colors: object): Record<string, string>;
  export default flattenColorPalette;
}
