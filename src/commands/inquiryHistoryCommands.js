export function createInquiryHistoryCommand(data) {
  const inquiryHistory = {
    title: data.title,
    status: false,
  };

  return inquiryHistory;
}

export function readInquiryHistoryCommand(doc) {
  const inquiryHistory = {
    id: doc._id,
    title: doc.title,
    status: doc.status,
  };

  return inquiryHistory;
}

export function updateInquiryHistoryCommand(data) {
  const inquiryHistory = {
    status: data.status,
  };

  return inquiryHistory;
}
