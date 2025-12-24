import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
    framework: "@storybook/react-vite",
    stories: ["../src/**/*.stories.@(ts|tsx)"],
    addons: [],

    async viteFinal(cfg) {
        cfg.optimizeDeps ??= {};

        // Prebundle CJS deps to avoid "does not provide an export named 'default'"
        const include = new Set(cfg.optimizeDeps.include ?? []);
        include.add("hoist-non-react-statics");
        cfg.optimizeDeps.include = [...include];

        // Avoid Yarn4/Vite scanner noise for these packages
        const exclude = new Set(cfg.optimizeDeps.exclude ?? []);
        exclude.add("@mui/icons-material");
        exclude.add("@mui/material");
        exclude.add("@emotion/react");
        exclude.add("@emotion/styled");
        cfg.optimizeDeps.exclude = [...exclude];

        // Extra safety for mixed CJS/ESM deps in SB preview builds
        cfg.build ??= {};
        cfg.build.commonjsOptions ??= {};
        cfg.build.commonjsOptions.transformMixedEsModules = true;

        return cfg;
    },
};

export default config;
