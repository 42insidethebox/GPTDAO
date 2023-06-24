async function submitProposal() {
  const form = document.getElementById("create-proposal-form");

  const data = {
    proposalType: form["proposal-type"].value,
    title: form["proposal-title"].value,
    description: form["proposal-description"].value,
    targetAudience: form["proposal-audience"].value,
    currentStatus: form["proposal-status"].value,
    kpis: form["proposal-kpi"].value.split("\n"),
    risksAndChallenges: form["proposal-risks"].value.split("\n"),
    dependencies: form["proposal-dependencies"].value.split("\n"),
    ownershipAndGovernance: form["proposal-ownership"].value,
    intellectualPropertyRights: form["proposal-ip"].value,
    confidentialityAgreement: form["proposal-nda"].value,
    socialImpact: form["proposal-social-impact"].value,
    diversityInclusion: form["proposal-diversity"].value,
    attachments: [], // You will need to handle file uploads separately
    link: form["proposal-link"].value,
    budget: form["proposal-budget"].value,
  };

  try {
    const response = await fetch("/api/v1/proposals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 201) {
      alert("Proposal submitted successfully");
      form.reset();
    } else {
      alert("Error submitting proposal");
    }
  } catch (error) {
    console.error("this is the error", error);
    alert(`Error submitting proposar, ${error} :( `);
  }
}
