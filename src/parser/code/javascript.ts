const regex = /\/\/:([^\n]+)(\n|$)/;

export default (source: string) => {
  let current = source.trim();
  let matches = current.match(regex);
  const settingsRaw = [];

  while (current.length > 0 && matches) {
    let setting = matches[1];
    settingsRaw.push(setting.trim());
    current = current.substring(matches[0].length);
    matches = current.match(regex);
  }

  return {
    raw: current,
    settings: settingsRaw.reduce((output, setting) => {
      const parts = setting.split('=');
      let value: any = true;
      if (parts[1]) {
        value = parts[1].trim();
      }
      output[parts[0].trim()] = value;
      return output;
    }, {} as {[name: string]: any})
  };
}
