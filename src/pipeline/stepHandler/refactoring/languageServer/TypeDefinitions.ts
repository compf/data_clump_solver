interface Message {
	jsonrpc: string;
}
interface ResponseError {
	/**
	 * A number indicating the error type that occurred.
	 */
	code: number;

	/**
	 * A string providing a short description of the error.
	 */
	message: string;

	/**
	 * A primitive or structured value that contains additional
	 * information about the error. Can be omitted.
	 */
	data?:any;
}
export interface ResponseMessage extends Message {
	/**
	 * The request id.
	 */
	id: number;

	/**
	 * The result of a request. This member is REQUIRED on success.
	 * This member MUST NOT exist if there was an error invoking the method.
	 */
	result?:any;

	/**
	 * The error object in case a request fails.
	 */
	error?: ResponseError;
}
