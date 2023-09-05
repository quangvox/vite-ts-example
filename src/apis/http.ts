import * as Auth from 'utils/auth';

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type requestConfig = {
  url: string;
  method: string;
  data?: BodyInit | null;
  options?: RequestInit;
};

type Headers = HeadersInit & {
  Authorization?: string;
};

export type HTTPErrors = Error & {
  response?: {
    status: number;
    headers: Headers;
    data?: unknown;
  };
};

const originalFetch = window.fetch;

export async function request({ url, method, data, options }: requestConfig) {
  if (!(method in Method)) {
    throw new Error(`Not supported method ${method}`);
  }

  let requestOptions;
  const headers: Headers = {
    ...options?.headers,
    'X-User-Time': `${Math.round(new Date().getTime() / 1000)}`,
  };

  const accessToken = Auth.getAccessToken();
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  if (method === Method.POST || method === Method.PATCH || method === Method.PUT) {
    requestOptions = {
      ...options,
      method,
      headers,
      body: data,
    };
  }

  if (method === Method.GET || method === Method.DELETE) {
    requestOptions = {
      ...options,
      method,
      headers,
    };
  }

  const response = await fetch(url, requestOptions);
  return response;
}

export function addResponseInterceptor({
  onFullfilled,
  onRejected,
}: {
  onFullfilled: (response: Response) => void;
  onRejected: (err: HTTPErrors) => void;
}) {
  window.fetch = async (...args) => {
    const [resource, config] = args;

    const response = await originalFetch(resource, config);

    if (response.ok) {
      onFullfilled(response);
    } else {
      const error: HTTPErrors = {
        name: 'HTTPError',
        message: response.statusText,
        response: {
          status: response.status,
          headers: response.headers,
          data: await response.json(),
        },
      };
      onRejected(error);
    }

    return response;
  };
}
