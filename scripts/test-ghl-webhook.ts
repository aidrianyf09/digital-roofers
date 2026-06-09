const WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/ZQr2SZDIAOrZm0ZceiTe/webhook-trigger/052a462c-25f3-4ef8-848f-b69b511c13e3";

const payload = {
  firstName: "Test",
  lastName: "Lead",
  email: "test@digitalroofersfl.com",
  phone: "+15555550123",
  companyName: "Acme Roofing FL",
  serviceArea: "Miami, FL",
  adSpend: "3000",
  platform: "Facebook",
  estimatedRevenue: "45000",
  source: "Digital Roofers Revenue Calculator",
  tags: ["Cold Outreach FL", "Calculator Lead"],
  pipelineStage: "Cold Lead",
};

async function main() {
  const res = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = await res.text();
  console.log("Status:", res.status);
  console.log("Body:", body);
  if (res.ok) {
    console.log("GHL webhook test fired successfully");
  } else {
    console.error("GHL webhook test failed");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
