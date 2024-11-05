# Starting up with Matts template
https://replit.com/@matt/Vite-React-Starter
Validate with Run

# Install basics
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

touch jsconfig.json

# Configure some files
..see code below. 
Copyed in code to jsconfig.json
Copyed in code to vite.config.js

# Installera Shadcn
~/FrontMattTemplateTake1$ npm install -g shadcn-ui@0.8.0

added 171 packages in 3s

42 packages are looking for funding
  run `npm fund` for details
~/FrontMattTemplateTake1$ shadcn-ui init
✔ Would you like to use TypeScript (recommended)? … no
✔ Which style would you like to use? › Default
✔ Which color would you like to use as base color? › Slate
✔ Where is your global CSS file? … src/index.css
✔ Would you like to use CSS variables for colors? … yes
✔ Are you using a custom tailwind prefix eg. tw-? (Leave blank if not) … 
✔ Where is your tailwind.config.js located? … tailwind.config.js
✔ Configure the import alias for components: … @/components
✔ Configure the import alias for utils: … @/lib/utils
✔ Are you using React Server Components? … no
✔ Write configuration to components.json. Proceed? … yes

✔ Writing components.json...
✔ Initializing project...
✔ Installing dependencies...

Success! Project initialization completed. You may now add components.

~/FrontMattTemplateTake1$ 

# Add Shadcn UI components
npx shadcn-ui@0.8.0 add input button checkbox



# Code needed
jsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

vite.config.js
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});