type APIResponse = { ok: true; result: any } | { ok: false; msg: string };

const makeRequest = async (path: string, options: RequestInit) => {
  const response = await fetch(path, options);
  if (!response.ok) throw new Error(response.statusText);

  const data = (await response.json()) as APIResponse;
  if (data.ok) {
    return Promise.resolve(data.result);
  } else {
    throw new Error(data.msg);
  }
};

export const sendFormData = async (path: string, body: FormData) => {
  return makeRequest(path, { body, method: "post" });
};

export const sendJson = (path: string, body: string) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  return makeRequest(path, { body, headers, method: "post" });
};
