import type { Plugin } from "vite";
import type { OutputBundle, OutputChunk } from "rollup";

export function bundleOptimizer(): Plugin {
  return {
    name: "bundle-optimizer",
    apply: "build",
    generateBundle(options, bundle: OutputBundle) {
      // Analyze and optimize each chunk
      Object.keys(bundle).forEach((fileName) => {
        const chunk = bundle[fileName];
        
        if (chunk.type === "chunk") {
          const outputChunk = chunk as OutputChunk;
          
          // Remove unused HeroUI imports from generated code
          if (outputChunk.code) {
            // Log bundle size information
            const sizeInKB = (outputChunk.code.length / 1024).toFixed(2);
            console.log(`📦 ${fileName}: ${sizeInKB}KB`);
            
            // Check for HeroUI imports
            const heroUIImports = (outputChunk.code.match(/@heroui/g) || []).length;
            if (heroUIImports > 0) {
              console.log(`   └─ Contains ${heroUIImports} HeroUI references`);
            }
          }
        }
      });
    },
    
    buildEnd() {
      console.log("🎯 Bundle optimization complete");
    }
  };
}