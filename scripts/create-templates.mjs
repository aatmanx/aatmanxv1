import fs from "fs";
import path from "path";

const templates = [
  { id: "agency-v1", name: "Real Estate Agency", category: "agency", desc: "Brokerage and agency websites with property listings, team showcase, and lead capture.", features: ["property listings", "team profiles", "contact forms", "site visit booking", "testimonials"] },
  { id: "developer-v1", name: "Property Developer", category: "developer", desc: "Developer and builder sites highlighting projects, timelines, and investment opportunities.", features: ["project showcase", "timeline", "floor plans", "lead capture", "investor CTA"] },
  { id: "luxury-v1", name: "Luxury Real Estate", category: "luxury", desc: "High-end property marketing with editorial layouts and premium visual storytelling.", features: ["luxury listings", "editorial hero", "private showings", "concierge contact", "video backgrounds"] },
  { id: "commercial-v1", name: "Commercial Real Estate", category: "commercial", desc: "Commercial property platforms for offices, retail, and industrial assets.", features: ["commercial listings", "space calculator", "tenant inquiry", "location maps", "brochure downloads"] },
  { id: "management-v1", name: "Property Management", category: "management", desc: "Property management company sites with service pages and tenant portals.", features: ["service pages", "tenant portal link", "maintenance requests", "owner login", "FAQ"] },
];

for (const t of templates) {
  const root = path.join("templates", "real-estate", t.id);
  const dirs = ["components", "pages", "assets", "IMPORT_HERE"];
  dirs.forEach((d) => {
    fs.mkdirSync(path.join(root, d), { recursive: true });
    fs.writeFileSync(path.join(root, d, ".gitkeep"), "");
  });

  const readme = `# ${t.name} Template\n\n## Purpose\n${t.desc}\n\n## Template Category\n**${t.category}** — maps to questionnaire business types in the real-estate industry.\n\n## Supported Features\n${t.features.map((f) => `- ${f}`).join("\n")}\n\n## Status\nPlaceholder — paste Lovable export into \`IMPORT_HERE/\` then ask Cursor to convert.\n\n## Folder Structure\n- \`IMPORT_HERE/\` — paste raw Lovable export here\n- \`components/\` — converted reusable components (after conversion)\n- \`pages/\` — converted page templates\n- \`assets/\` — images, fonts, and static files\n- \`template.json\` — manifest\n- \`sample-data.json\` — demo data for preview\n`;
  fs.writeFileSync(path.join(root, "README.md"), readme);

  const importHere = `# Paste Lovable Code Here\n\nThis folder is where exported Lovable code should be pasted.\n\n## Workflow\n1. Build your website in Lovable for this template category (${t.category}).\n2. Export the code from Lovable.\n3. Paste the entire export into this \`IMPORT_HERE/\` folder.\n4. Ask Cursor: "Convert the Lovable code in IMPORT_HERE into an Aatmanx reusable template."\n5. Cursor performs conversion **inside this same template folder** — moving artifacts into \`components/\`, \`pages/\`, and \`assets/\`.\n6. The converted template remains at \`templates/real-estate/${t.id}/\`.\n\nDo not paste Lovable code into \`components/\` or \`pages/\` directly — always use \`IMPORT_HERE/\` first.\n`;
  fs.writeFileSync(path.join(root, "IMPORT_HERE.md"), importHere);

  const manifest = {
    id: `real-estate/${t.id}`,
    name: t.name,
    industry: "real-estate",
    category: t.category,
    version: "1.0.0",
    status: "placeholder",
    description: t.desc,
    supportedFeatures: t.features,
    pages: ["home", "about", "properties", "contact"],
    components: ["hero", "property-grid", "team", "contact-form", "footer"],
    rootPath: `templates/real-estate/${t.id}`,
    importPath: `templates/real-estate/${t.id}/IMPORT_HERE`,
  };
  fs.writeFileSync(path.join(root, "template.json"), JSON.stringify(manifest, null, 2));

  const sample = {
    businessName: `Sample ${t.name}`,
    templateCategory: t.category,
    hero: { title: "Find your next property", subtitle: "Premium real estate services" },
    properties: [{ title: "Sample Property", price: "₹1.2 Cr", location: "Bangalore" }],
  };
  fs.writeFileSync(path.join(root, "sample-data.json"), JSON.stringify(sample, null, 2));
}

console.log(`Created ${templates.length} templates`);
