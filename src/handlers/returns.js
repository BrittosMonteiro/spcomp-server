export function successData(res, data) {
  return res.status(200).json({ data: data });
}

export function successMessage(res, message) {
  return res.status(200).json({ message: message });
}

export function created(res, message) {
  return res.status(201).json({ message: message });
}

export function createdData(res, data) {
  return res.status(201).json({ data: data });
}

export function noContent(res, message) {
  return res.status(204).json({ message: message });
}

export function accessDenied(res, message) {
  return res.status(401).json({ message: message });
}

export function errorNotFound(res, message) {
  return res.status(404).json({ errorMessage: message });
}

export function errorCouldNotLoad(res, message) {
  return res.status(500).json({ errorMessage: message });
}

export function errorServiceUnavailable(res, message) {
  return res.status(503).json({ errorMessage: message });
}
