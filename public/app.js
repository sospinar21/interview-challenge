

const campaignData = async () => {
  const response = await fetch('http://localhost:3000/data');
  const data = await response.json();
  await createClass(data);
  return data;
}

class Campaign {
  constructor(campaigns) {
    Object.keys(campaigns).forEach(campaign => this[campaign] = campaigns[campaign]);
  }
}

const createClass = (campaigns) => {
  const campaignInstances = campaigns.rows.map(campaign => {
    const campaignClass = new Campaign(campaign);
    return campaignClass;
  })
  displayCampaigns(campaignInstances)
  displayPromoInfo(campaignInstances)
}

const displayPromoInfo = (campaigns) => {
  campaigns.forEach(campaign => {
    console.log(campaign)
    const promoInfo = `
        <h1 class='dayOfWeek'>Day of Week: ${campaign.dayOfWeek}</h1>
        <h1 class='device'>Device: ${campaign.device}</h1>
        <h1 class='adGroupName'>Group Name: ${campaign.adGroupName}</h1>
        <h1 class='adNetworkType'>Network type: ${campaign.adNetworkType}</h1>
    `
    document.querySelector('.promo-info').innerHTML = promoInfo
  })
}


const displayCampaigns = (campaignClass) => {
  const template = document.querySelector('#template');
  campaignClass.forEach(campaign => {
    var boxCopy = document.importNode(template, true);
    document.querySelector('.container').appendChild(boxCopy);
    boxCopy.querySelector('.status').style.background = '#11b911';
    boxCopy.querySelector('.campaigne-name').innerText = `Name: ${campaign.campaignName}`;
    boxCopy.querySelector('.impressions').innerText = `Impressions: ${campaign.impressions}`;
    boxCopy.querySelector('.sis').innerText = `SIShare: ${campaign.searchImpressionShare}`;
    boxCopy.querySelector('.max-impressions').innerText = `Max Impressions: ${campaign.maxImpressions}`;
    boxCopy.querySelector('.ctr').innerText = `Ctr: ${campaign.ctr}`;
    boxCopy.querySelector('.avgCpc').innerText = `AvgCpc: ${campaign.avgCpc}`;
    boxCopy.querySelector('.avg-position').innerText = `Avg Position: ${campaign.avgPosition}`;
    boxCopy.querySelector('.clicks').innerText = `Clicks: ${campaign.clicks}`;
    boxCopy.querySelector('.conversion').innerText = `Conversion: ${campaign.conversions}`;
    boxCopy.querySelector('.cost').innerText = `Cost: ${campaign.cost}`; 
})
}


campaignData();