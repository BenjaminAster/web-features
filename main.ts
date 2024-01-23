
/* 
bun run main.ts
*/

import { readFile, writeFile } from "node:fs/promises";
import { DOMParser, type HTMLTemplateElement } from "@benjaminaster/unofficial-deno-dom-on-npm";

import features from "./features.ts";

const document = new DOMParser().parseFromString(await readFile(await import.meta.resolve("./template.html"), { encoding: "utf-8" }), "text/html");

const template = document.documentElement.querySelector("template#item") as HTMLTemplateElement;
const engineTemplate = document.documentElement.querySelector("template#engine") as HTMLTemplateElement;

for (const [category, featureList] of Object.entries(features)) {
	for (const [feature, support, url] of featureList as any) {
		const clone = template.cloneNode(true).content;
		clone.querySelector(".name").textContent = feature;
		clone.querySelector("a").setAttribute("href", url);
		for (const { engine, engineName, labels } of support) {
			const engineClone = engineTemplate.cloneNode(true).content;
			engineClone.querySelector(".engine").classList.add(engine, ...labels);
			engineClone.querySelector(".engine").setAttribute("title", `Supported in ${engineName}${labels.length ? ` (${labels.join(", ").replaceAll("-", " ")})` : ""}`);
			clone.querySelector(".engines").append(engineClone);
		}
		document.getElementById(category).append(clone);
	}
}

await writeFile(await import.meta.resolve("./index.html"), "<!DOCTYPE html>\n" + document.documentElement.outerHTML, { encoding: "utf-8" });
