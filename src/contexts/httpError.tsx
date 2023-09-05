import React, { createContext, useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import * as HTTP from 'apis/http';

const FORBIDDEN_RESPONSE_TYPES = ['text/html'];
const HTTPErrorContext = createContext<HTTP.HTTPErrors | null>(null);
const HTTPErrorUpdateContext = createContext<(error: Error) => void>(() => {});

function includesType(type: string, checkTypes: string[]) {
  return checkTypes.some((checkType) => type.includes(checkType));
}

function checkResponse(response: Response) {
  const contentType = response.headers.get('content-type') || '';

  if (includesType(contentType, FORBIDDEN_RESPONSE_TYPES)) {
    const error = {
      message: `Forbidden response ContentType: ${contentType}`,
      response: response,
    };
    return error;
  }

  return null;
}

function HTTPErrorProvider({ children }: { children: React.ReactNode }) {
  const [httpError, setHTTPError] = useState<HTTP.HTTPErrors | null>(null);

  useLayoutEffect(() => {
    HTTP.addResponseInterceptor({
      onFullfilled: function onFullfilled(response) {
        const error = checkResponse(response);
        if (error) {
          return Promise.reject(error);
        }
        return Promise.resolve(response);
      },
      onRejected: function onRejected(error) {
        setHTTPError(error);
        return Promise.reject(error);
      },
    });
  }, []);

  return (
    <HTTPErrorContext.Provider value={httpError}>
      <HTTPErrorUpdateContext.Provider value={setHTTPError}>
        {children}
      </HTTPErrorUpdateContext.Provider>
    </HTTPErrorContext.Provider>
  );
}

HTTPErrorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { HTTPErrorProvider, HTTPErrorContext, HTTPErrorUpdateContext };
