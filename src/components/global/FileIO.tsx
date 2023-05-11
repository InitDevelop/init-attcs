export const downloadObjectAsJson = (exportObj: object, exportName: string) => {
  const jsonStr = JSON.stringify(exportObj);
  const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(jsonStr)}`;
  const exportFileDefaultName = `${exportName}.json`;

  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}