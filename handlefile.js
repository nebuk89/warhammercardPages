
function handleFileSelect(event: Event) {

    const input = event?.type === "resize"
        ? fileChangeEvent?.target as HTMLInputElement
        : event?.target as HTMLInputElement;
  
    cleanup();
  
    if (!input?.files) return;
    const file = input?.files[0];
  
    if (event?.type !== "resize") fileChangeEvent = event;
  
    file.arrayBuffer().then(async (buf: ArrayBuffer) => {
      if (file.name.match(/\.rosz?$/)) {
        const xmldata = await maybeUnzip(buf, /[^/]+\.ros$/);
        parseBattleScribeXML(xmldata);
      } else if (file.name.match(/\.regi[sz]try$/)) {
        const jsondata = await maybeUnzip(buf, /[^/]+\.registry$/);
        parseRosterizerJSON(jsondata);
      } else {
        showErrorModal(`PrettyScribe does not support extension of ${file.name}.`);
      }
    }).catch((e) => {
      showErrorModal(`Error opening ${file.name}: ${e}`);
      console.error(e);
    });