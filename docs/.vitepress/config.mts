import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "microCMS RichEditor Handler",
	titleTemplate: ":title | microCMS RichEditor Handler",
	description:
		"microCMSのリッチエディタコンテンツを変換したりデータを抽出します。",
	cleanUrls: true,
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: "Introduction", link: "/" },
			{ text: "Examples", link: "/examples/responsive-image" },
		],

		sidebar: [
			{
				text: "Introduction",
				items: [
					{ text: "What is This?", link: "/" },
					{ text: "Getting Started", link: "/introduction/getting-started" },
				],
			},
			{
				text: "Features",
				items: [
					{ text: "Handler", link: "/features/handler" },
					{
						text: "Transformer",
						link: "/features/transformer",
						items: [
							{
								text: "Responsive Image",
								link: "/features/transformer/responsive-image",
							},
							{
								text: "Syntax Highlighting by Shiki",
								link: "/features/transformer/syntax-highlighting-by-shiki",
							},
							{
								text: "Code Block File Name",
								link: "/features/transformer/code-block-file-name",
							},
							{
								text: "Attributes",
								link: "/features/transformer/attributes",
							},
						],
					},
					{
						text: "Extractor",
						link: "/features/extractor",
						items: [
							{
								text: "TOCExtractor",
								link: "/features/extractor/toc",
							},
						],
					},
				],
			},
			{
				text: "Examples",
				items: [
					{ text: "Responsive Image", link: "/examples/responsive-image" },
					{ text: "Lazy Loading", link: "/examples/lazy-loading" },
					{ text: "Astro", link: "/examples/astro" },
				],
			},
		],

		socialLinks: [
			{
				icon: "github",
				link: "https://github.com/dc7290/microcms-rich-editor-handler",
			},
			{ icon: "x", link: "https://x.com/d_suke_09" },
		],

		search: {
			provider: "local",
		},
	},
});
