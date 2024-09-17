
import { type Config as WinzigConfig } from "winzig";

winzigConfig: ({
	output: "../",
	appfiles: "./appfiles/",
	css: "./main.css",
	noCSSScopeRules: true,
	noJavaScript: true,
}) satisfies WinzigConfig;

import features from "./features.ts";

const FeaturesList = (props: { name: keyof typeof features, title: string; }) => {
	return <li>
		<h2>{props.title}</h2>
		<ul>
			{...features[props.name].map(([feature, support, url]) =>
				<li>
					<a href={url} className="name">{feature}</a>
					<div className="engines">
						{...support.map(({ engine, engineName, labels }) => {
							const title = `Supported in ${engineName}`
								+ (labels.length ? ` (${labels.join(", ").replaceAll("-", " ")})` : "");
							return <div
								className={`engine ${engine + labels.map(label => " " + label)}`}
								title={title}
							/>;
						})}
					</div>
				</li>
			)}
		</ul>
	</li>;
};

;
<html lang="en">

	<head>
		<meta name="robots" content="all" />
		<meta name="description" content="An overview of (mostly new) web features that are not yet fully supported in all three browser engines." />
		<link rel="code-repository" href="https://github.com/BenjaminAster/web-features" />

		<title>Web features</title>

		<link rel="icon" href="./assets/icon.svg" />

		<link rel="preload" as="image" href="./assets/blink.svg" />
		<link rel="preload" as="image" href="./assets/gecko.svg" />
		<link rel="preload" as="image" href="./assets/webkit.svg" />
	</head>

	<body>
		<header aria-label="information" className="info">
			<h1>Web features</h1>

			<div className="details">
				<input type="checkbox" id="info-details" aria-label="toggle info expansion" />
				<label className="summary" htmlFor="info-details">
					<h2>
						<span data-nosnippet>Expand for more info</span>
					</h2>
				</label>
				<div className="expansion">
					<div>
						<p>
							This site provides an overview of many web features that are not yet fully supported (unprefixed) in all three major browser engines.
							These range from features already implemented in two browser engines up to unofficial drafts and even just proposals.
							The three major browser engines are:
						</p>

						<div className="horizontal-scroll">
							<table className="engines-table">
								<thead>
									<tr>
										<td>Logo</td>
										<td>Browser engine</td>
										<td>Associated browser</td>
										<td>Company</td>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td><img className="engine" src="./assets/blink.svg" alt="logo of Blink (actually the Chromium logo because Blink doesn't have its own logo)" /></td>
										<td>Blink</td>
										<td>Chrome/<wbr />Chromium</td>
										<td>Google</td>
									</tr>
									<tr>
										<td><img className="engine" src="./assets/webkit.svg" alt="logo of WebKit" /></td>
										<td>WebKit</td>
										<td>Safari</td>
										<td>Apple</td>
									</tr>
									<tr>
										<td><img className="engine" src="./assets/gecko.svg" alt="logo of Gecko" /></td>
										<td>Gecko</td>
										<td>Firefox</td>
										<td>Mozilla</td>
									</tr>
								</tbody>
							</table>
						</div>

						<h3>Legend</h3>

						<div className="horizontal-scroll">
							<table>
								<thead>
									<tr>
										<td>Icon</td>
										<td>Description</td>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											<div className="engines">
												<div className="engine blink"></div>
												<div className="engine webkit"></div>
												<div className="engine gecko"></div>
											</div>
										</td>
										<td>
											The feature is supported in the current stable version of the associated browser.
										</td>
									</tr>
									<tr>
										<td>
											<div className="engines">
												<div className="engine blink experimental"></div>
												<div className="engine webkit experimental"></div>
												<div className="engine gecko experimental"></div>
											</div>
										</td>
										<td>
											The feature is experimentally supported in a developer preview version of the associated browser.
											A special flag might need to be enabled.
										</td>
									</tr>
									<tr>
										<td>
											<div className="engines">
												<div className="engine blink prefixed"></div>
												<div className="engine webkit prefixed"></div>
												<div className="engine gecko prefixed"></div>
											</div>
										</td>
										<td>
											The feature uses a non-standard, vendor-prefixed name.
										</td>
									</tr>
									<tr>
										<td>
											<div className="engines">
												<div className="engine blink limited-support"></div>
												<div className="engine webkit limited-support"></div>
												<div className="engine gecko limited-support"></div>
											</div>
										</td>
										<td>
											The feature has limited support (e.g. not available on all platforms)
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</header>

		<main aria-label="features">
			<ul className="features">
				<FeaturesList name="html" title="HTML & Media" />
				<FeaturesList name="css" title="CSS" />
				<FeaturesList name="javascript-apis" title="JavaScript APIs" />
				<FeaturesList name="ecmascript" title="ECMAScript" />
				<FeaturesList name="webassembly" title="WebAssembly" />
			</ul>
		</main>
	</body>
</html>;
