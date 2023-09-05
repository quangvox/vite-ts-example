import { useContext } from 'react';

import { HTTPErrorContext, HTTPErrorUpdateContext } from 'contexts/httpError';

function useHTTPError() {
  const httpError = useContext(HTTPErrorContext);
  if (typeof httpError === 'undefined') {
    throw new Error('useHTTPError must be used within a HTTPErrorContext');
  }
  return httpError;
}

export function useHTTPErrorUpdate() {
  const setHTTPError = useContext(HTTPErrorUpdateContext);
  if (typeof setHTTPError === 'undefined') {
    throw new Error('useHTTPErrorUpdate must be used within a HTTPErrorProvider');
  }
  return setHTTPError;
}

export default useHTTPError;
