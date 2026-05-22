
;(async () => {
  try {

    let webhookData
    try {
      webhookData = getContext("webhookData")
    } catch (err) {
      console.error("Webhook extraction error: Context key webhookData not set")
      setContext("incidentData", null)
      setContext("eventType", null)
      setContext("messageText", null)
      setContext("location", null)
      setContext("extraWebhookData", null)
      return 
    }

    if (!webhookData) {
      console.error("Webhook extraction error: webhookData context value is missing or empty")
      setContext("incidentData", null)
      setContext("eventType", null)
      setContext("messageText", null)
      setContext("location", null)
      setContext("extraWebhookData", null)
      return 
    }

    
    const eventType = webhookData.eventType || ""
    const messageText = webhookData.messageText || webhookData.text || ""
    const location = webhookData.location ||
                 webhookData.gps ||
                 (webhookData.latitude && webhookData.longitude
                   ? `${webhookData.latitude},${webhookData.longitude}`
                   : null)
    const extra = webhookData.extra || {}

    setContext("eventType", eventType)
    setContext("messageText", messageText)
    setContext("location", location)
    setContext("incidentData", { ...webhookData }) 
    setContext("extraWebhookData", extra) 
    console.log("Webhook data extracted:", { eventType, messageText, location, extra })
  } catch (err) {
    console.error("Webhook extraction error (unexpected):", err)
    setContext("incidentData", null)
    setContext("eventType", null)
    setContext("messageText", null)
    setContext("location", null)
    setContext("extraWebhookData", null)

  }
})()
