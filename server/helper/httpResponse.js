export const serverError = response => response.status(500).json({
  status: response.statusCode,
  error: 'Something went wrong. Try again later',
});
export const clientError = (response, responseCode, ...values) => {
  const [statusKey, statusResult, dataKey, dataValue] = values;
  return response.status(responseCode).json({
    [statusKey]: statusResult,
    [dataKey]: dataValue,
  });
};
// eslint-disable-next-line max-len
export const successResponse = (response, responseCode, userData) => response.status(responseCode).json({
  status: 'success',
  data: userData,
});
