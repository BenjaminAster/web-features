
/* 

deno run --allow-read --allow-write=. main.deno.ts

*/

// @ts-ignore
import { DOMParser as _DOMParser } from "https://deno.land/x/deno_dom@v0.1.31-alpha/deno-dom-wasm.ts";
const DOMParser: typeof globalThis.DOMParser = _DOMParser;

import features from "./features.ts";

const document = new DOMParser().parseFromString(await Deno.readTextFile("./template.html"), "text/html");
document

const template = document.querySelector<HTMLTemplateElement>("template#item");
const engineTemplate = document.querySelector<HTMLTemplateElement>("template#engine");

for (const [category, featureList] of Object.entries(features)) {
	for (const [feature, support, url] of featureList as any) {
		const clone = (template.cloneNode(true) as HTMLTemplateElement).content;
		clone.querySelector(".name").textContent = feature;
		clone.querySelector("a").setAttribute("href", url);
		for (const { engine, engineName, labels } of support) {
			const engineClone = (engineTemplate.cloneNode(true) as HTMLTemplateElement).content;
			engineClone.querySelector(".engine").classList.add(engine, ...labels);
			engineClone.querySelector(".engine").setAttribute("title", `Supported in ${engineName}${labels.length ? ` (${labels.join(", ")})` : ""}`);
			clone.querySelector(".engines").append(engineClone);
		}
		document.getElementById(category).append(clone);
	}
}

await Deno.writeTextFile("./index.html", "<!DOCTYPE html>\n" + document.documentElement.outerHTML);
