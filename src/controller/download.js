import xlsx from "xlsx";
import path from "path";

export async function exportInquiryListToExcel(
  inquiryList,
  worksheetColumnNames,
  worksheetName
) {
  const data = inquiryList.map((item) => {
    return [
      item.quantity,
      item.type,
      item.description,
      item.encap,
      item.brand,
      0,
    ];
  });
  const workBook = xlsx.utils.book_new();
  const worksheetData = [worksheetColumnNames, ...data];
  const worksheet = xlsx.utils.aoa_to_sheet(worksheetData);
  xlsx.utils.book_append_sheet(workBook, worksheet, worksheetName);
  xlsx.writeFile(workBook, path.resolve(`./inquiries/${worksheetName}.xlsx`));
  return true;
}
