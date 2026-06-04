globalThis.__nitro_main__ = import.meta.url;
import { N as NodeResponse, s as serve } from "./_libs/srvx.mjs";
import { H as HTTPError, d as defineHandler, t as toEventHandler, a as defineLazyEventHandler, b as H3Core } from "./_libs/h3.mjs";
import { d as decodePath, w as withLeadingSlash, a as withoutTrailingSlash, j as joinURL } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import "node:http";
import "node:stream";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "./_libs/rou3.mjs";
function lazyService(loader) {
  let promise, mod;
  return {
    fetch(req) {
      if (mod) {
        return mod.fetch(req);
      }
      if (!promise) {
        promise = loader().then((_mod) => mod = _mod.default || _mod);
      }
      return promise.then((mod2) => mod2.fetch(req));
    }
  };
}
const services = {
  ["ssr"]: lazyService(() => import("./_ssr/index.mjs"))
};
globalThis.__nitro_vite_envs__ = services;
const errorHandler$1 = (error, event) => {
  const res = defaultHandler(error, event);
  return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
  const unhandled = error.unhandled ?? !HTTPError.isError(error);
  const { status = 500, statusText = "" } = unhandled ? {} : error;
  if (status === 404) {
    const url = event.url || new URL(event.req.url);
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      return {
        status: 302,
        headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
      };
    }
  }
  const headers2 = new Headers(unhandled ? {} : error.headers);
  headers2.set("content-type", "application/json; charset=utf-8");
  const jsonBody = unhandled ? {
    status,
    unhandled: true
  } : typeof error.toJSON === "function" ? error.toJSON() : {
    status,
    statusText,
    message: error.message
  };
  return {
    status,
    statusText,
    headers: headers2,
    body: {
      error: true,
      ...jsonBody
    }
  };
}
const errorHandlers = [errorHandler$1];
async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      const response = await handler(error, event, { defaultHandler });
      if (response) {
        return response;
      }
    } catch (error2) {
      console.error(error2);
    }
  }
}
const headers = ((m) => function headersRouteRule(event) {
  for (const [key2, value] of Object.entries(m.options || {})) {
    event.res.headers.set(key2, value);
  }
});
const assets = {
  "/assets/KaTeX_AMS-Regular-BQhdFMY1.woff2": {
    "type": "font/woff2",
    "etag": '"6dac-NElHQ3Nv2nVxl9FvzGpuGnkxfIY"',
    "mtime": "2026-06-04T10:01:28.552Z",
    "size": 28076,
    "path": "../client/assets/KaTeX_AMS-Regular-BQhdFMY1.woff2"
  },
  "/assets/BarChart-D4clPCbR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5d20b-ewScbo/RW0yMTzT8CUiVn5/pCcs"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 381451,
    "path": "../client/assets/BarChart-D4clPCbR.js"
  },
  "/assets/KaTeX_AMS-Regular-DMm9YOAa.woff": {
    "type": "font/woff",
    "etag": '"82ec-ma2i3jIA55UUPWOSMsNESwgBgjU"',
    "mtime": "2026-06-04T10:01:28.558Z",
    "size": 33516,
    "path": "../client/assets/KaTeX_AMS-Regular-DMm9YOAa.woff"
  },
  "/assets/KaTeX_Caligraphic-Bold-ATXxdsX0.ttf": {
    "type": "font/ttf",
    "etag": '"3050-j6tziha6j7fnACoHXwNqRVpFxug"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 12368,
    "path": "../client/assets/KaTeX_Caligraphic-Bold-ATXxdsX0.ttf"
  },
  "/assets/KaTeX_AMS-Regular-DRggAlZN.ttf": {
    "type": "font/ttf",
    "etag": '"f890-Hf0O5uMPihwjmZ2dll24cAtany4"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 63632,
    "path": "../client/assets/KaTeX_AMS-Regular-DRggAlZN.ttf"
  },
  "/assets/KaTeX_Caligraphic-Bold-BEiXGLvX.woff": {
    "type": "font/woff",
    "etag": '"1e24-3SOsD7CsRpsGJEhep41wD2NhQgM"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 7716,
    "path": "../client/assets/KaTeX_Caligraphic-Bold-BEiXGLvX.woff"
  },
  "/assets/KaTeX_Caligraphic-Regular-CTRA-rTL.woff": {
    "type": "font/woff",
    "etag": '"1de8-Gm85vXDJt0cTB431991hCPm604s"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 7656,
    "path": "../client/assets/KaTeX_Caligraphic-Regular-CTRA-rTL.woff"
  },
  "/assets/KaTeX_Caligraphic-Bold-Dq_IR9rO.woff2": {
    "type": "font/woff2",
    "etag": '"1b00-W/pJysRs0derE1E4jTfBGvWbphU"',
    "mtime": "2026-06-04T10:01:28.558Z",
    "size": 6912,
    "path": "../client/assets/KaTeX_Caligraphic-Bold-Dq_IR9rO.woff2"
  },
  "/assets/KaTeX_Caligraphic-Regular-Di6jR-x-.woff2": {
    "type": "font/woff2",
    "etag": '"1afc-n4B34LOKKQzZt7E2sKwpyDdegaY"',
    "mtime": "2026-06-04T10:01:28.558Z",
    "size": 6908,
    "path": "../client/assets/KaTeX_Caligraphic-Regular-Di6jR-x-.woff2"
  },
  "/assets/KaTeX_Caligraphic-Regular-wX97UBjC.ttf": {
    "type": "font/ttf",
    "etag": '"3038-JvJqE+an0KabSPYqzTGoGWvOf24"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 12344,
    "path": "../client/assets/KaTeX_Caligraphic-Regular-wX97UBjC.ttf"
  },
  "/assets/KaTeX_Fraktur-Bold-BdnERNNW.ttf": {
    "type": "font/ttf",
    "etag": '"4c80-TgjdADgxJOfNlpcMyw++NcnvqqM"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 19584,
    "path": "../client/assets/KaTeX_Fraktur-Bold-BdnERNNW.ttf"
  },
  "/assets/KaTeX_Fraktur-Bold-BsDP51OF.woff": {
    "type": "font/woff",
    "etag": '"33f0-W7r9UB8mIhlCavfyDBEDu0tzJZI"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 13296,
    "path": "../client/assets/KaTeX_Fraktur-Bold-BsDP51OF.woff"
  },
  "/assets/KaTeX_Fraktur-Bold-CL6g_b3V.woff2": {
    "type": "font/woff2",
    "etag": '"2c54-+Y+JJy7KEa5BdnLFmg+qaoiAWok"',
    "mtime": "2026-06-04T10:01:28.558Z",
    "size": 11348,
    "path": "../client/assets/KaTeX_Fraktur-Bold-CL6g_b3V.woff2"
  },
  "/assets/KaTeX_Fraktur-Regular-CB_wures.ttf": {
    "type": "font/ttf",
    "etag": '"4c74-F9tAiC3V8UBiXyjdlMQwReGJPpg"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 19572,
    "path": "../client/assets/KaTeX_Fraktur-Regular-CB_wures.ttf"
  },
  "/assets/KaTeX_Fraktur-Regular-Dxdc4cR9.woff": {
    "type": "font/woff",
    "etag": '"3398-b3VjdjYPCBW0SGL1f3let8HNTbI"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 13208,
    "path": "../client/assets/KaTeX_Fraktur-Regular-Dxdc4cR9.woff"
  },
  "/assets/KaTeX_Main-Bold-waoOVXN0.ttf": {
    "type": "font/ttf",
    "etag": '"c888-QTqz3D/DpXUidbriyuZ+tY8rMvA"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 51336,
    "path": "../client/assets/KaTeX_Main-Bold-waoOVXN0.ttf"
  },
  "/assets/KaTeX_Main-Bold-Cx986IdX.woff2": {
    "type": "font/woff2",
    "etag": '"62ec-MQUKGxsSP7LFnK0fdLff+Q3rj84"',
    "mtime": "2026-06-04T10:01:28.558Z",
    "size": 25324,
    "path": "../client/assets/KaTeX_Main-Bold-Cx986IdX.woff2"
  },
  "/assets/KaTeX_Fraktur-Regular-CTYiF6lA.woff2": {
    "type": "font/woff2",
    "etag": '"2c34-pXZMbieE0CggwLkECJ8/rHmL5Po"',
    "mtime": "2026-06-04T10:01:28.558Z",
    "size": 11316,
    "path": "../client/assets/KaTeX_Fraktur-Regular-CTYiF6lA.woff2"
  },
  "/assets/KaTeX_Main-Bold-Jm3AIy58.woff": {
    "type": "font/woff",
    "etag": '"74d8-9po2JQ6ubooCFzqZCapihCi6IGA"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 29912,
    "path": "../client/assets/KaTeX_Main-Bold-Jm3AIy58.woff"
  },
  "/assets/KaTeX_Main-BoldItalic-DxDJ3AOS.woff2": {
    "type": "font/woff2",
    "etag": '"418c-pKSQW4sSb5/9VT0hpyoMJOlIA0U"',
    "mtime": "2026-06-04T10:01:28.558Z",
    "size": 16780,
    "path": "../client/assets/KaTeX_Main-BoldItalic-DxDJ3AOS.woff2"
  },
  "/assets/KaTeX_Main-BoldItalic-DzxPMmG6.ttf": {
    "type": "font/ttf",
    "etag": '"80c8-umRk5EL9UK73Z4kkug8tlYHruwc"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 32968,
    "path": "../client/assets/KaTeX_Main-BoldItalic-DzxPMmG6.ttf"
  },
  "/assets/KaTeX_Main-BoldItalic-SpSLRI95.woff": {
    "type": "font/woff",
    "etag": '"4bd4-A4u9yIh6lzCtlBR/xXxv9N+0hBE"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 19412,
    "path": "../client/assets/KaTeX_Main-BoldItalic-SpSLRI95.woff"
  },
  "/assets/KaTeX_Main-Italic-3WenGoN9.ttf": {
    "type": "font/ttf",
    "etag": '"832c-HVZoorlK59vu/dfNaNmP6dWCXgc"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 33580,
    "path": "../client/assets/KaTeX_Main-Italic-3WenGoN9.ttf"
  },
  "/assets/KaTeX_Main-Italic-NWA7e6Wa.woff2": {
    "type": "font/woff2",
    "etag": '"425c-ybK1/9LyeqXGtvm6QaeytOZhAtM"',
    "mtime": "2026-06-04T10:01:28.558Z",
    "size": 16988,
    "path": "../client/assets/KaTeX_Main-Italic-NWA7e6Wa.woff2"
  },
  "/assets/KaTeX_Main-Italic-BMLOBm91.woff": {
    "type": "font/woff",
    "etag": '"4cdc-fIWJITvHAD4sIzS1HKQVKFiYer0"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 19676,
    "path": "../client/assets/KaTeX_Main-Italic-BMLOBm91.woff"
  },
  "/assets/KaTeX_Main-Regular-B22Nviop.woff2": {
    "type": "font/woff2",
    "etag": '"66a0-yIQIbCXOyFWBYLICb5Bu99o1cKw"',
    "mtime": "2026-06-04T10:01:28.558Z",
    "size": 26272,
    "path": "../client/assets/KaTeX_Main-Regular-B22Nviop.woff2"
  },
  "/assets/KaTeX_Main-Regular-Dr94JaBh.woff": {
    "type": "font/woff",
    "etag": '"7834-/crlS6HUY17oWlRizByX5SHP1RU"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 30772,
    "path": "../client/assets/KaTeX_Main-Regular-Dr94JaBh.woff"
  },
  "/assets/KaTeX_Main-Regular-ypZvNtVU.ttf": {
    "type": "font/ttf",
    "etag": '"d14c-h0TbbvjDCePchfG76YBSCti3v9Q"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 53580,
    "path": "../client/assets/KaTeX_Main-Regular-ypZvNtVU.ttf"
  },
  "/assets/KaTeX_Math-BoldItalic-iY-2wyZ7.woff": {
    "type": "font/woff",
    "etag": '"48ec-1U5kgNbUBGxqVhmqODuqWXH7igw"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 18668,
    "path": "../client/assets/KaTeX_Math-BoldItalic-iY-2wyZ7.woff"
  },
  "/assets/KaTeX_Math-BoldItalic-B3XSjfu4.ttf": {
    "type": "font/ttf",
    "etag": '"79dc-6AzEwjLSB192KlLUa+tP+9N6Xxo"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 31196,
    "path": "../client/assets/KaTeX_Math-BoldItalic-B3XSjfu4.ttf"
  },
  "/assets/KaTeX_Math-Italic-DA0__PXp.woff": {
    "type": "font/woff",
    "etag": '"493c-HBtIc54ctL4T3djAvCed3oUb26A"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 18748,
    "path": "../client/assets/KaTeX_Math-Italic-DA0__PXp.woff"
  },
  "/assets/KaTeX_Math-Italic-flOr_0UB.ttf": {
    "type": "font/ttf",
    "etag": '"7a4c-npoQ2Ppa2Iyez6SQKt3U2SWAsrw"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 31308,
    "path": "../client/assets/KaTeX_Math-Italic-flOr_0UB.ttf"
  },
  "/assets/KaTeX_Math-BoldItalic-CZnvNsCZ.woff2": {
    "type": "font/woff2",
    "etag": '"4010-j8udLeZaxxoMT92YYXPbcwWS7Yo"',
    "mtime": "2026-06-04T10:01:28.558Z",
    "size": 16400,
    "path": "../client/assets/KaTeX_Math-BoldItalic-CZnvNsCZ.woff2"
  },
  "/assets/KaTeX_SansSerif-Bold-CFMepnvq.ttf": {
    "type": "font/ttf",
    "etag": '"5fb8-ILRfU0a2htUsRFdFOT0XB7uI7B0"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 24504,
    "path": "../client/assets/KaTeX_SansSerif-Bold-CFMepnvq.ttf"
  },
  "/assets/KaTeX_SansSerif-Bold-D1sUS0GD.woff2": {
    "type": "font/woff2",
    "etag": '"2fb8-iG5heXpSXUqvzgqvV0FP366huHM"',
    "mtime": "2026-06-04T10:01:28.558Z",
    "size": 12216,
    "path": "../client/assets/KaTeX_SansSerif-Bold-D1sUS0GD.woff2"
  },
  "/assets/KaTeX_Math-Italic-t53AETM-.woff2": {
    "type": "font/woff2",
    "etag": '"4038-20iD0M/5XstcA0EOMoOnN8Ue1gQ"',
    "mtime": "2026-06-04T10:01:28.558Z",
    "size": 16440,
    "path": "../client/assets/KaTeX_Math-Italic-t53AETM-.woff2"
  },
  "/assets/KaTeX_SansSerif-Bold-DbIhKOiC.woff": {
    "type": "font/woff",
    "etag": '"3848-or7dyKPU0IAo1wd3btvU0k8uwPw"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 14408,
    "path": "../client/assets/KaTeX_SansSerif-Bold-DbIhKOiC.woff"
  },
  "/assets/KaTeX_SansSerif-Italic-C3H0VqGB.woff2": {
    "type": "font/woff2",
    "etag": '"2efc-PV+jyzCfjYO03L3SdyXycPYPPus"',
    "mtime": "2026-06-04T10:01:28.558Z",
    "size": 12028,
    "path": "../client/assets/KaTeX_SansSerif-Italic-C3H0VqGB.woff2"
  },
  "/assets/KaTeX_SansSerif-Italic-DN2j7dab.woff": {
    "type": "font/woff",
    "etag": '"3720-dWSjZrdv2DcEHCS+70xVgKWt1A4"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 14112,
    "path": "../client/assets/KaTeX_SansSerif-Italic-DN2j7dab.woff"
  },
  "/assets/KaTeX_SansSerif-Italic-YYjJ1zSn.ttf": {
    "type": "font/ttf",
    "etag": '"575c-mR+9wDFouxSkRHz6PlFfCabs/tw"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 22364,
    "path": "../client/assets/KaTeX_SansSerif-Italic-YYjJ1zSn.ttf"
  },
  "/assets/KaTeX_SansSerif-Regular-BNo7hRIc.ttf": {
    "type": "font/ttf",
    "etag": '"4bec-So4XoMtYqCKN1EF/vRuJnkHasEU"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 19436,
    "path": "../client/assets/KaTeX_SansSerif-Regular-BNo7hRIc.ttf"
  },
  "/assets/KaTeX_SansSerif-Regular-CS6fqUqJ.woff": {
    "type": "font/woff",
    "etag": '"301c-gEYQ9MsuLq2WlLjaLshOzo0Jw40"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 12316,
    "path": "../client/assets/KaTeX_SansSerif-Regular-CS6fqUqJ.woff"
  },
  "/assets/KaTeX_SansSerif-Regular-DDBCnlJ7.woff2": {
    "type": "font/woff2",
    "etag": '"2868-5F1fT0p/L/PcqfzMLxSOeB4j8pI"',
    "mtime": "2026-06-04T10:01:28.558Z",
    "size": 10344,
    "path": "../client/assets/KaTeX_SansSerif-Regular-DDBCnlJ7.woff2"
  },
  "/assets/KaTeX_Script-Regular-C5JkGWo-.ttf": {
    "type": "font/ttf",
    "etag": '"4108-xvZ12oGtKcvySyz3cPeVtNosZI4"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 16648,
    "path": "../client/assets/KaTeX_Script-Regular-C5JkGWo-.ttf"
  },
  "/assets/KaTeX_Script-Regular-D3wIWfF6.woff2": {
    "type": "font/woff2",
    "etag": '"25ac-Y7gJWfH8Voma4hugy7zTmmywg5A"',
    "mtime": "2026-06-04T10:01:28.558Z",
    "size": 9644,
    "path": "../client/assets/KaTeX_Script-Regular-D3wIWfF6.woff2"
  },
  "/assets/KaTeX_Script-Regular-D5yQViql.woff": {
    "type": "font/woff",
    "etag": '"295c-agXNyk8fcIXmB9w4vt71V1P4b9g"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 10588,
    "path": "../client/assets/KaTeX_Script-Regular-D5yQViql.woff"
  },
  "/assets/KaTeX_Size1-Regular-C195tn64.woff": {
    "type": "font/woff",
    "etag": '"1960-rv5mdKVlM2J8c5zXiWOY8USH4Bw"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 6496,
    "path": "../client/assets/KaTeX_Size1-Regular-C195tn64.woff"
  },
  "/assets/KaTeX_Size1-Regular-Dbsnue_I.ttf": {
    "type": "font/ttf",
    "etag": '"2fc4-MoC6y8sSRZcf4BAXtHTHbDN8EMk"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 12228,
    "path": "../client/assets/KaTeX_Size1-Regular-Dbsnue_I.ttf"
  },
  "/assets/KaTeX_Size2-Regular-B7gKUWhC.ttf": {
    "type": "font/ttf",
    "etag": '"2cf4-+vc/8+eVGE5UMWZv+v64qg4og00"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 11508,
    "path": "../client/assets/KaTeX_Size2-Regular-B7gKUWhC.ttf"
  },
  "/assets/KaTeX_Size1-Regular-mCD8mA8B.woff2": {
    "type": "font/woff2",
    "etag": '"155c-V/pZmXShvAs31fDlzIYCMC8CtXM"',
    "mtime": "2026-06-04T10:01:28.558Z",
    "size": 5468,
    "path": "../client/assets/KaTeX_Size1-Regular-mCD8mA8B.woff2"
  },
  "/assets/KaTeX_Size2-Regular-oD1tc_U0.woff": {
    "type": "font/woff",
    "etag": '"182c-RmmP8YGb0ngm/V0txLpOH2PKzfQ"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 6188,
    "path": "../client/assets/KaTeX_Size2-Regular-oD1tc_U0.woff"
  },
  "/assets/KaTeX_Size2-Regular-Dy4dx90m.woff2": {
    "type": "font/woff2",
    "etag": '"1458-7hhxNjSjvoyZcnaAhVKrGVpZj0M"',
    "mtime": "2026-06-04T10:01:28.558Z",
    "size": 5208,
    "path": "../client/assets/KaTeX_Size2-Regular-Dy4dx90m.woff2"
  },
  "/assets/KaTeX_Size3-Regular-CTq5MqoE.woff": {
    "type": "font/woff",
    "etag": '"1144-HaGQWm0dm8q5KwWd9ytSjepwi8s"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 4420,
    "path": "../client/assets/KaTeX_Size3-Regular-CTq5MqoE.woff"
  },
  "/assets/KaTeX_Size3-Regular-DgpXs0kz.ttf": {
    "type": "font/ttf",
    "etag": '"1da4-MCphsuzfgtOeZ4D0K9B+5M5nuNU"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 7588,
    "path": "../client/assets/KaTeX_Size3-Regular-DgpXs0kz.ttf"
  },
  "/assets/KaTeX_Size4-Regular-DWFBv043.ttf": {
    "type": "font/ttf",
    "etag": '"287c-PY2d1YoDt6RtSX9XYeYNi4RKUZk"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 10364,
    "path": "../client/assets/KaTeX_Size4-Regular-DWFBv043.ttf"
  },
  "/assets/KaTeX_Size4-Regular-BF-4gkZK.woff": {
    "type": "font/woff",
    "etag": '"175c-j93bg1E+wiYjHr7gUHnsRfwBNXg"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 5980,
    "path": "../client/assets/KaTeX_Size4-Regular-BF-4gkZK.woff"
  },
  "/assets/KaTeX_Size4-Regular-Dl5lxZxV.woff2": {
    "type": "font/woff2",
    "etag": '"1340-m+0X+5LyZQUB4imGLEDGQH4cVSg"',
    "mtime": "2026-06-04T10:01:28.558Z",
    "size": 4928,
    "path": "../client/assets/KaTeX_Size4-Regular-Dl5lxZxV.woff2"
  },
  "/assets/KaTeX_Typewriter-Regular-C0xS9mPB.woff": {
    "type": "font/woff",
    "etag": '"3e9c-9ecp+k/0ZvwH4MerGXmtcMRfpdU"',
    "mtime": "2026-06-04T10:01:28.565Z",
    "size": 16028,
    "path": "../client/assets/KaTeX_Typewriter-Regular-C0xS9mPB.woff"
  },
  "/assets/KaTeX_Typewriter-Regular-CO6r4hn1.woff2": {
    "type": "font/woff2",
    "etag": '"3500-egiIP//GlYxxzAGnWguZzKPktHU"',
    "mtime": "2026-06-04T10:01:28.558Z",
    "size": 13568,
    "path": "../client/assets/KaTeX_Typewriter-Regular-CO6r4hn1.woff2"
  },
  "/assets/KaTeX_Typewriter-Regular-D3Ib7_Hf.ttf": {
    "type": "font/ttf",
    "etag": '"6ba4-YpuZ+vGNl1KfIaGxAYCT5gvNBY8"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 27556,
    "path": "../client/assets/KaTeX_Typewriter-Regular-D3Ib7_Hf.ttf"
  },
  "/assets/admin-pjEIFR2T.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2bee-zzWMvFrRuWGFFQwtpuIc3dGCMcU"',
    "mtime": "2026-06-04T10:01:28.560Z",
    "size": 11246,
    "path": "../client/assets/admin-pjEIFR2T.js"
  },
  "/assets/admin.absent-DGO6gvBn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11e1-ANmU9H4gHnLf9srGFlbK2hAj7Ok"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 4577,
    "path": "../client/assets/admin.absent-DGO6gvBn.js"
  },
  "/assets/admin.admission-6PGSEW9d.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f064-duKrGzMjrSF/AaehKStBRv1HjYw"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 61540,
    "path": "../client/assets/admin.admission-6PGSEW9d.js"
  },
  "/assets/admin.analysis-DVwFP27r.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2b6f-acV72WgXfgZ34oHNoF8yrO3YyUY"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 11119,
    "path": "../client/assets/admin.analysis-DVwFP27r.js"
  },
  "/assets/admin.attendance-Z7D6RNlr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"186c-QhmYUkKt3hyvkSm6GhJKRdf/4to"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 6252,
    "path": "../client/assets/admin.attendance-Z7D6RNlr.js"
  },
  "/assets/admin.feed-CrcwTKdW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2bcb-KXy56LaaksT2gPDKb8F6JWP3Qk0"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 11211,
    "path": "../client/assets/admin.feed-CrcwTKdW.js"
  },
  "/assets/admin.functions-Bheucyh-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2c2-hvbjSsmznoUnc+7xzLFv2/zUKK8"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 706,
    "path": "../client/assets/admin.functions-Bheucyh-.js"
  },
  "/assets/admin.marksheet-6HkgZclM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2290-RjIAix9gRv938N0GswBfTquzyJA"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 8848,
    "path": "../client/assets/admin.marksheet-6HkgZclM.js"
  },
  "/assets/admin.index-BLN6N_eG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1072-DFUXe+K5Ac+LRzChV68G1UT8tKg"',
    "mtime": "2026-06-04T10:01:28.560Z",
    "size": 4210,
    "path": "../client/assets/admin.index-BLN6N_eG.js"
  },
  "/assets/admin.messages-B82k58HP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1818-6EDMKJ9vq4JvWXJLx3k1XsjqWwg"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 6168,
    "path": "../client/assets/admin.messages-B82k58HP.js"
  },
  "/assets/admin.notices-wQwSqQ3e.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1626-GTKFlanS2MQQM6J8rTvRkPTkXJQ"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 5670,
    "path": "../client/assets/admin.notices-wQwSqQ3e.js"
  },
  "/assets/admin.newsfeed-Bag9sqhq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5a0-ZC1fK7dG+O2FEWjVCMsMTeZy0N4"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 1440,
    "path": "../client/assets/admin.newsfeed-Bag9sqhq.js"
  },
  "/assets/admin.phonebook-BXdyIPLX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e7e-+1P2GDnlura9LyuyN/KAE0ZxYPI"',
    "mtime": "2026-06-04T10:01:28.561Z",
    "size": 7806,
    "path": "../client/assets/admin.phonebook-BXdyIPLX.js"
  },
  "/assets/admin.profile-D13wX5hF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1207-qw+0UgNtALNqIBYEgQpB3M4GLOs"',
    "mtime": "2026-06-04T10:01:28.561Z",
    "size": 4615,
    "path": "../client/assets/admin.profile-D13wX5hF.js"
  },
  "/assets/admin.question-bank-_nNBM5Ul.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"276a-OAzo9lYWEL58+4jng7abrje36wg"',
    "mtime": "2026-06-04T10:01:28.561Z",
    "size": 10090,
    "path": "../client/assets/admin.question-bank-_nNBM5Ul.js"
  },
  "/assets/admin.results._examId-Bj30lEMi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1be5-wtgdLMUA5xlN7NH32U9PpidHqok"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 7141,
    "path": "../client/assets/admin.results._examId-Bj30lEMi.js"
  },
  "/assets/admin.results-suhGKN3F.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f-Up7rnpCzo3zT0UHF5YwGfZlR5pg"',
    "mtime": "2026-06-04T10:01:28.561Z",
    "size": 95,
    "path": "../client/assets/admin.results-suhGKN3F.js"
  },
  "/assets/admin.security-WhhI7fQN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"875-vbkylrc3PJrtnk7acOOOLRa8rWI"',
    "mtime": "2026-06-04T10:01:28.561Z",
    "size": 2165,
    "path": "../client/assets/admin.security-WhhI7fQN.js"
  },
  "/assets/admin.results.index-D0Fhiwhe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"21b0-RSDvsMtzmrxHwzGrUGrzK+FeUMc"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 8624,
    "path": "../client/assets/admin.results.index-D0Fhiwhe.js"
  },
  "/assets/admin.site-KSGsRAes.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4196-jKQiWjgxFuObm87o0rRq53WWvY4"',
    "mtime": "2026-06-04T10:01:28.561Z",
    "size": 16790,
    "path": "../client/assets/admin.site-KSGsRAes.js"
  },
  "/assets/admin.sms-pNgcKEJv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"193b-UJ5uJaBzyIUg8oolsKjZ217IeIw"',
    "mtime": "2026-06-04T10:01:28.561Z",
    "size": 6459,
    "path": "../client/assets/admin.sms-pNgcKEJv.js"
  },
  "/assets/admin.students-COPbE5zv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"30ef-zzxASVKGkJlO3u09TVZabzEUHQk"',
    "mtime": "2026-06-04T10:01:28.561Z",
    "size": 12527,
    "path": "../client/assets/admin.students-COPbE5zv.js"
  },
  "/assets/admin.teachers-CKquRBas.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"cb4-yf9bnCnRRC3AJ2/wfjATXUxFOWs"',
    "mtime": "2026-06-04T10:01:28.561Z",
    "size": 3252,
    "path": "../client/assets/admin.teachers-CKquRBas.js"
  },
  "/assets/admin.videos-De6foQSN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"174e-D9YhZ5fElo5PEjMhXgNwqkS+iq4"',
    "mtime": "2026-06-04T10:01:28.560Z",
    "size": 5966,
    "path": "../client/assets/admin.videos-De6foQSN.js"
  },
  "/assets/arrow-left-W6QQfFNq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b1-7HBM5eho5IB90gbMqswhBFq15HM"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 177,
    "path": "../client/assets/arrow-left-W6QQfFNq.js"
  },
  "/assets/arrow-right-B_qGrtWy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b1-fJCDx+9IdQxKw5N+ehDGDko5a/4"',
    "mtime": "2026-06-04T10:01:28.560Z",
    "size": 177,
    "path": "../client/assets/arrow-right-B_qGrtWy.js"
  },
  "/assets/auth-middleware-B0VhL7Rl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11e6-34xTysqN/7l/IdpptZl82Rrg6Fc"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 4582,
    "path": "../client/assets/auth-middleware-B0VhL7Rl.js"
  },
  "/assets/bell-C6hQn-6w.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12e-/DCKRTfiGz2iA22VaLBfCnEdUJQ"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 302,
    "path": "../client/assets/bell-C6hQn-6w.js"
  },
  "/assets/book-open-check-ChCV1oDi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"15b-fefy+xe/fgDlW2lRvGF4O0wFr6U"',
    "mtime": "2026-06-04T10:01:28.560Z",
    "size": 347,
    "path": "../client/assets/book-open-check-ChCV1oDi.js"
  },
  "/assets/book-user-BfGXbnpc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"133-XgP8S5u0350m5kXOr7qwjtBBt+M"',
    "mtime": "2026-06-04T10:01:28.560Z",
    "size": 307,
    "path": "../client/assets/book-user-BfGXbnpc.js"
  },
  "/assets/button-C77HKKwy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e67-mRUGPNgP1s4BKnODxt3uE0KHSs4"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 3687,
    "path": "../client/assets/button-C77HKKwy.js"
  },
  "/assets/calendar-check-DsOZAytY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"13d-JGOpHbyDJxu2qyUAVy/b05uYodI"',
    "mtime": "2026-06-04T10:01:28.560Z",
    "size": 317,
    "path": "../client/assets/calendar-check-DsOZAytY.js"
  },
  "/assets/calendar-search-DRfx8nem.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18d-iDDCjCbfdgmwHBID7esE/M+Jbuw"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 397,
    "path": "../client/assets/calendar-search-DRfx8nem.js"
  },
  "/assets/camera-BPSlcPAd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"15c-0De7VXmz+YqJvZ9IHUuFpezgcjk"',
    "mtime": "2026-06-04T10:01:28.561Z",
    "size": 348,
    "path": "../client/assets/camera-BPSlcPAd.js"
  },
  "/assets/chart-column-BLTflh1r.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"107-EZBiEz+G4DLSsRVWdCp2TzVwytM"',
    "mtime": "2026-06-04T10:01:28.560Z",
    "size": 263,
    "path": "../client/assets/chart-column-BLTflh1r.js"
  },
  "/assets/check-_FRJX3Pj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-ZphHGrG2HR5q3zHoGMcUhUXPFM0"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 131,
    "path": "../client/assets/check-_FRJX3Pj.js"
  },
  "/assets/chevron-left-BaagL1If.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8e-pXQNa99uNBBgV7/3FmOKjVIRv6s"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 142,
    "path": "../client/assets/chevron-left-BaagL1If.js"
  },
  "/assets/chevron-up-n0iKDwNp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"dc-bFYXVmxFFuXbFDnJtUwxhaTbt3k"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 220,
    "path": "../client/assets/chevron-up-n0iKDwNp.js"
  },
  "/assets/class-merit-BHKGuYzP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1cdc-b8+EFbEWzpr8YgOUgQDlPFu21yM"',
    "mtime": "2026-06-04T10:01:28.560Z",
    "size": 7388,
    "path": "../client/assets/class-merit-BHKGuYzP.js"
  },
  "/assets/clipboard-check-BMp30qBu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"137-43vnKIFs0uNNeOn0ADN1yGhOmvE"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 311,
    "path": "../client/assets/clipboard-check-BMp30qBu.js"
  },
  "/assets/clock-CfTPGKKS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b0-EpiJoMuHMhg/m3SCO1HjLpF+tXE"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 176,
    "path": "../client/assets/clock-CfTPGKKS.js"
  },
  "/assets/clsx-B-dksMZM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"176-FAATnZjnCwN/ZZH/TBgLKs+l6Yk"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 374,
    "path": "../client/assets/clsx-B-dksMZM.js"
  },
  "/assets/createLucideIcon-CAP5A0F7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4b2-w1HQzXQ1CrHBFET+jNrhrDo/v7M"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 1202,
    "path": "../client/assets/createLucideIcon-CAP5A0F7.js"
  },
  "/assets/database-Bpzj_FQu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ff-+l8WamSubf3Qi9h37M9+GqQHSmU"',
    "mtime": "2026-06-04T10:01:28.561Z",
    "size": 255,
    "path": "../client/assets/database-Bpzj_FQu.js"
  },
  "/assets/file-text-D5BM0uXu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18d-gWicgCMaevOG8Qi+7HRVWw2Yz5w"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 397,
    "path": "../client/assets/file-text-D5BM0uXu.js"
  },
  "/assets/dialog-zbd1gVBj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"80f-avzix9x0WOCdPFdkeKyLz6feT5Y"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 2063,
    "path": "../client/assets/dialog-zbd1gVBj.js"
  },
  "/assets/feature-cards-CJVycqDe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e8d-rkLaVjh2/wtevcseWXjW8rNJoiE"',
    "mtime": "2026-06-04T10:01:28.560Z",
    "size": 3725,
    "path": "../client/assets/feature-cards-CJVycqDe.js"
  },
  "/assets/grading-CzZL8vZ7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"55a-p5ImXwf1BtvOzqx+VXuRsIrRkGI"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 1370,
    "path": "../client/assets/grading-CzZL8vZ7.js"
  },
  "/assets/index-B1Ti0kQN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8f-ZROdnPALb4F/4fCtZqvkhjQFGoM"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 143,
    "path": "../client/assets/index-B1Ti0kQN.js"
  },
  "/assets/graduation-cap-B5i60Muz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"158-H6AXJrzycwH4WZlYMk9dIt3ogMQ"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 344,
    "path": "../client/assets/graduation-cap-B5i60Muz.js"
  },
  "/assets/index-BAMxUSLI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6c-JqB4RsHOQcfcqls1kpRDwJUXnZk"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 108,
    "path": "../client/assets/index-BAMxUSLI.js"
  },
  "/assets/index-BJG1FQkB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"220-rkThuR6CrlmmudxqA7+Qz0pcU+Q"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 544,
    "path": "../client/assets/index-BJG1FQkB.js"
  },
  "/assets/index-BMzVF3za.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10a0-CkpAmLMGcOiSK9i93Q2uxbd6ll8"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 4256,
    "path": "../client/assets/index-BMzVF3za.js"
  },
  "/assets/index-C4dCIvej.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8851-L078ltXS7e7NUCCSBL5LvNiForg"',
    "mtime": "2026-06-04T10:01:28.560Z",
    "size": 34897,
    "path": "../client/assets/index-C4dCIvej.js"
  },
  "/assets/index-CgQkYg0Q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ac-Cz8w2Utf0hGsSgUh5vE6f6fd5n0"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 172,
    "path": "../client/assets/index-CgQkYg0Q.js"
  },
  "/assets/index-DJh5ZooX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a27-syaC6bL6AugHd/wp+p4z8w8uIA8"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 2599,
    "path": "../client/assets/index-DJh5ZooX.js"
  },
  "/assets/index-DLsSQTCd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"19ca-F7uGRoQyopeey4dzpsO6MehTgCI"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 6602,
    "path": "../client/assets/index-DLsSQTCd.js"
  },
  "/assets/index-DSl9G7QH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"831-6wawYuWsFVlfgPXkYjKoN7KiZvY"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 2097,
    "path": "../client/assets/index-DSl9G7QH.js"
  },
  "/assets/index-DiP-dGrl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fe-unGc05Eq4X5WEW2HZWn3pPZz4DY"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 254,
    "path": "../client/assets/index-DiP-dGrl.js"
  },
  "/assets/index-DqTMU0iy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e8-clSGbDaumuzNeEW/QYGWRtMVAPs"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 232,
    "path": "../client/assets/index-DqTMU0iy.js"
  },
  "/assets/index-ld1QCgjV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4d44-RI/ZI3klcYij4d1/CGuGV/cB134"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 19780,
    "path": "../client/assets/index-ld1QCgjV.js"
  },
  "/assets/input-y-WOlvX3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"24e-S7DtI2jhQ0JOGpLfJSpPAfeVbNk"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 590,
    "path": "../client/assets/input-y-WOlvX3.js"
  },
  "/assets/index-z5CT155p.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6b0f-cR2GKYC1wY+iP//cJVet+CDkIug"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 27407,
    "path": "../client/assets/index-z5CT155p.js"
  },
  "/assets/key-round-xiOE0UzN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"16a-FzD+KD2Rc9JV6BdzLSFNcaj66So"',
    "mtime": "2026-06-04T10:01:28.561Z",
    "size": 362,
    "path": "../client/assets/key-round-xiOE0UzN.js"
  },
  "/assets/index-CyByoLmZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"94e67-wv0w05DicVsqeADOJKtIntVV7Wo"',
    "mtime": "2026-06-04T10:01:28.565Z",
    "size": 609895,
    "path": "../client/assets/index-CyByoLmZ.js"
  },
  "/assets/label-V7WDIUXp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3b5-ldd+9SBE+uzAu7/Xi/kWXTo6kTk"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 949,
    "path": "../client/assets/label-V7WDIUXp.js"
  },
  "/assets/loader-circle-CW7it51S.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"97-LfwiQHMvpjc6TyQYRjzCXAO3Svg"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 151,
    "path": "../client/assets/loader-circle-CW7it51S.js"
  },
  "/assets/login-C434Z-nb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"17f0-84ShMU9RpBc++EfL8DzcUaNOuSo"',
    "mtime": "2026-06-04T10:01:28.560Z",
    "size": 6128,
    "path": "../client/assets/login-C434Z-nb.js"
  },
  "/assets/math-text-Cp579UoJ.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"7267-b1AgB+XJT7WCz48kAkoJYS/YoZ4"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 29287,
    "path": "../client/assets/math-text-Cp579UoJ.css"
  },
  "/assets/math-text-Bvd9e7R6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ffb2-nPi0ieUOvQH7Jfgf/VFWkZHyXLA"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 262066,
    "path": "../client/assets/math-text-Bvd9e7R6.js"
  },
  "/assets/mcq-exam.functions-BqVQBbaG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"591d-EpDBwS1PjcY7klZs1fP/7ZddQGU"',
    "mtime": "2026-06-04T10:01:28.561Z",
    "size": 22813,
    "path": "../client/assets/mcq-exam.functions-BqVQBbaG.js"
  },
  "/assets/message-square-XBiNJVq7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f5-WztUD3gXV8haWiVLYOPYSVUAulY"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 245,
    "path": "../client/assets/message-square-XBiNJVq7.js"
  },
  "/assets/news-feed-CUH3S-Tn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ca4-771etpuhuYqlsKjKWySuA1Y3IsQ"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 15524,
    "path": "../client/assets/news-feed-CUH3S-Tn.js"
  },
  "/assets/newspaper-DI6Wbmhi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"164-QOJFJQcoPfdBdTMr98oJPGhrc0s"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 356,
    "path": "../client/assets/newspaper-DI6Wbmhi.js"
  },
  "/assets/notifications-bell-omntBeRx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"be94-TWiZ3cwwFctoolXCTn30jBUhdo4"',
    "mtime": "2026-06-04T10:01:28.560Z",
    "size": 48788,
    "path": "../client/assets/notifications-bell-omntBeRx.js"
  },
  "/assets/password-input-ANg9aODr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"54e-3hv/CcES+Nw2DjpOvCqlvMa+w5s"',
    "mtime": "2026-06-04T10:01:28.561Z",
    "size": 1358,
    "path": "../client/assets/password-input-ANg9aODr.js"
  },
  "/assets/pencil-BYb-8WeS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"120-k3SndEH7DU8Gd9vn3wB9JGo/uDs"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 288,
    "path": "../client/assets/pencil-BYb-8WeS.js"
  },
  "/assets/phone-B7WWrDEQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"14e-SD466ickpE4V1xJ2sjHICWZkO5Y"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 334,
    "path": "../client/assets/phone-B7WWrDEQ.js"
  },
  "/assets/plus-GdFsXWpR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a5-FcZQ/BkKAwwn/KSkYE2+cneWjBU"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 165,
    "path": "../client/assets/plus-GdFsXWpR.js"
  },
  "/assets/printer-auIwXYr4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"14b-IrstBZMxZHsBUzfmwo5LmjvCSW4"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 331,
    "path": "../client/assets/printer-auIwXYr4.js"
  },
  "/assets/search-C9PgRU5G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b5-QOXN9S2mcxGsbMb/WDZOK1h8NqM"',
    "mtime": "2026-06-04T10:01:28.561Z",
    "size": 181,
    "path": "../client/assets/search-C9PgRU5G.js"
  },
  "/assets/select-dmVJfAFd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"57d9-61PTAjfyRuGoXNJtcMKoJEsJRZY"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 22489,
    "path": "../client/assets/select-dmVJfAFd.js"
  },
  "/assets/send-BGrSBDu9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12e-XITs9NTkTp1DEGvwT9H9+W3O83c"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 302,
    "path": "../client/assets/send-BGrSBDu9.js"
  },
  "/assets/shield-check-DGwPmPCM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"147-64n+UVvfqP2HqW1gL+XA+AxpCgQ"',
    "mtime": "2026-06-04T10:01:28.560Z",
    "size": 327,
    "path": "../client/assets/shield-check-DGwPmPCM.js"
  },
  "/assets/site.functions-D7nidQq_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e6-ojIK9E/1CbFEMbjiXNUzoQixigg"',
    "mtime": "2026-06-04T10:01:28.560Z",
    "size": 230,
    "path": "../client/assets/site.functions-D7nidQq_.js"
  },
  "/assets/sms.functions-DuQ-VfaU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"eb-hVTKmSbgDfsdjlfvInTX4RZ7wkU"',
    "mtime": "2026-06-04T10:01:28.561Z",
    "size": 235,
    "path": "../client/assets/sms.functions-DuQ-VfaU.js"
  },
  "/assets/sparkles-BJLIW5xi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1fa-BU8u0uyy55QSV1IVgpcufM76WAw"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 506,
    "path": "../client/assets/sparkles-BJLIW5xi.js"
  },
  "/assets/student-CZ7_1Gnp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a1d-foSdDQMJw9dkGlRTSLLc0mICPY0"',
    "mtime": "2026-06-04T10:01:28.560Z",
    "size": 6685,
    "path": "../client/assets/student-CZ7_1Gnp.js"
  },
  "/assets/student-stats.functions-BpZPc_QV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e1-wb+1IDCfAJkUTTB2RAuro5cmMX4"',
    "mtime": "2026-06-04T10:01:28.560Z",
    "size": 481,
    "path": "../client/assets/student-stats.functions-BpZPc_QV.js"
  },
  "/assets/student.analysis-CQ3jbTXw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2729-71q3fuWyp1+DGmBTWCfYA0tCPA8"',
    "mtime": "2026-06-04T10:01:28.560Z",
    "size": 10025,
    "path": "../client/assets/student.analysis-CQ3jbTXw.js"
  },
  "/assets/student.attendance-CcieYM1F.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1458-zeHOhiOU50XJEHz7S6ZG8LzD4RU"',
    "mtime": "2026-06-04T10:01:28.560Z",
    "size": 5208,
    "path": "../client/assets/student.attendance-CcieYM1F.js"
  },
  "/assets/student.dashboard-552iUF-x.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29e0-B18tY/+YFnVc79gJkC3QZwiusWI"',
    "mtime": "2026-06-04T10:01:28.560Z",
    "size": 10720,
    "path": "../client/assets/student.dashboard-552iUF-x.js"
  },
  "/assets/student.exam--AWzYmBf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3daf-cbknIifbCcu5AJ0fca4mHgbxVw8"',
    "mtime": "2026-06-04T10:01:28.560Z",
    "size": 15791,
    "path": "../client/assets/student.exam--AWzYmBf.js"
  },
  "/assets/student.index-BMMjAV5m.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"314a-cSCXd8nyLZDm+iFtBk6fEq5Jy5A"',
    "mtime": "2026-06-04T10:01:28.560Z",
    "size": 12618,
    "path": "../client/assets/student.index-BMMjAV5m.js"
  },
  "/assets/student.messages-D6zIM5Vx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10d4-UqicZOGTbBVSKtexoR2ThZiXYdY"',
    "mtime": "2026-06-04T10:01:28.560Z",
    "size": 4308,
    "path": "../client/assets/student.messages-D6zIM5Vx.js"
  },
  "/assets/student.notices-Bzr3Hi4e.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9c8-CQYJ3vzGDpogBpBO3SS1zFTHPlY"',
    "mtime": "2026-06-04T10:01:28.560Z",
    "size": 2504,
    "path": "../client/assets/student.notices-Bzr3Hi4e.js"
  },
  "/assets/student.pdfs-1jKBensw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1151-E8IfwBV/btKnqgJkOmf4AFYK9l8"',
    "mtime": "2026-06-04T10:01:28.560Z",
    "size": 4433,
    "path": "../client/assets/student.pdfs-1jKBensw.js"
  },
  "/assets/student.profile-Df4DJFHV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1205-Qk/c3VczY0EeBSRgZDuvjz81Ipc"',
    "mtime": "2026-06-04T10:01:28.560Z",
    "size": 4613,
    "path": "../client/assets/student.profile-Df4DJFHV.js"
  },
  "/assets/student.results-IPH_Riqq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1161-6susjCaoiKa3y++ZQT8iNQg7SRM"',
    "mtime": "2026-06-04T10:01:28.560Z",
    "size": 4449,
    "path": "../client/assets/student.results-IPH_Riqq.js"
  },
  "/assets/styles-DbZVJCfb.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"1c19a-BxorI0QpXV7Upr8uhbx3N6h8Ckw"',
    "mtime": "2026-06-04T10:01:28.559Z",
    "size": 115098,
    "path": "../client/assets/styles-DbZVJCfb.css"
  },
  "/assets/switch-CkM6nQyS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a17-zfXJfpn4Y4WW9/eWacY7TqzIIBo"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 2583,
    "path": "../client/assets/switch-CkM6nQyS.js"
  },
  "/assets/table-CZFEfCmj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"63b-yxsT0mziHGWxFtDQh1GEMcadoVg"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 1595,
    "path": "../client/assets/table-CZFEfCmj.js"
  },
  "/assets/tabs-CvREGtJ7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1aa4-RJjil05xJGxPOW55YmDijTvj8KE"',
    "mtime": "2026-06-04T10:01:28.561Z",
    "size": 6820,
    "path": "../client/assets/tabs-CvREGtJ7.js"
  },
  "/assets/teacher.functions-D_N154cz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1c6-OmmsNgNEOrOfvvAIdLMw/eEOYSQ"',
    "mtime": "2026-06-04T10:01:28.561Z",
    "size": 454,
    "path": "../client/assets/teacher.functions-D_N154cz.js"
  },
  "/assets/textarea-BypWn-oa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e8-ISTWLbgWH5Q5+3+rm5aF8rIElro"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 488,
    "path": "../client/assets/textarea-BypWn-oa.js"
  },
  "/assets/trash-2-B1PyOeqN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"154-dseborE5J6wS0VFfsSFGfNZdWRE"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 340,
    "path": "../client/assets/trash-2-B1PyOeqN.js"
  },
  "/assets/trending-up-DDYnRwv8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"bb-D/F91zYcvxS3dCQOWBLZyvKM0MI"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 187,
    "path": "../client/assets/trending-up-DDYnRwv8.js"
  },
  "/assets/trophy-BUKq5nFd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e8-krkWepGQT4w0gfhkMEHfgg34eag"',
    "mtime": "2026-06-04T10:01:28.560Z",
    "size": 488,
    "path": "../client/assets/trophy-BUKq5nFd.js"
  },
  "/assets/upload-CVfgioq7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f2-YnUal7C4waSIzxHIxrvMRAY7YbM"',
    "mtime": "2026-06-04T10:01:28.561Z",
    "size": 242,
    "path": "../client/assets/upload-CVfgioq7.js"
  },
  "/assets/use-access-yiYJ8-qc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"27e-ou0ta8UWnidAEAa8mT5HefR1m10"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 638,
    "path": "../client/assets/use-access-yiYJ8-qc.js"
  },
  "/assets/useMutation-CZffjITj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"89b-pFJXFDA//w77bOlb/M1bQl9c8sE"',
    "mtime": "2026-06-04T10:01:28.561Z",
    "size": 2203,
    "path": "../client/assets/useMutation-CZffjITj.js"
  },
  "/assets/use-auth-DjnNboI7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"164-FYDHBkIVHJdhdw2+LEttExN4Q/Y"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 356,
    "path": "../client/assets/use-auth-DjnNboI7.js"
  },
  "/assets/useQuery-C25O-AtQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2269-ayI4XbKZMT/uaOYaO9hyKgtThXg"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 8809,
    "path": "../client/assets/useQuery-C25O-AtQ.js"
  },
  "/assets/user-cog-vU-Mas0M.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"291-nKDM2ILE8ne2MSRO6YYpIj25sJI"',
    "mtime": "2026-06-04T10:01:28.561Z",
    "size": 657,
    "path": "../client/assets/user-cog-vU-Mas0M.js"
  },
  "/assets/user-plus-aUIwxiFT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"142-MEtL42u53nC6mxZPzHZ6ssDYpDY"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 322,
    "path": "../client/assets/user-plus-aUIwxiFT.js"
  },
  "/assets/users-DN1HVHnZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"13e-xLLFIeUBlqcxmEJUWNbe+b6KhzQ"',
    "mtime": "2026-06-04T10:01:28.561Z",
    "size": 318,
    "path": "../client/assets/users-DN1HVHnZ.js"
  },
  "/assets/utils-SJJ7rXsJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6882-H4r01XMSzxbHm15zqUGWdDyqiCk"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 26754,
    "path": "../client/assets/utils-SJJ7rXsJ.js"
  },
  "/assets/user-round-DgCm3znV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"bd-cfdpQttbJ6jMG8i+IiXCBFcRG8k"',
    "mtime": "2026-06-04T10:01:28.561Z",
    "size": 189,
    "path": "../client/assets/user-round-DgCm3znV.js"
  },
  "/assets/youtube-DSVTMynO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"154-e2emAsxGam9hAFmUHAGB6hVOjrE"',
    "mtime": "2026-06-04T10:01:28.561Z",
    "size": 340,
    "path": "../client/assets/youtube-DSVTMynO.js"
  },
  "/assets/x-6EbE0fh2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-Gu32mE95QFc6XHGt0U3I30dorvs"',
    "mtime": "2026-06-04T10:01:28.562Z",
    "size": 166,
    "path": "../client/assets/x-6EbE0fh2.js"
  }
};
function readAsset(id) {
  const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
  return promises.readFile(resolve(serverDir, assets[id].path));
}
const publicAssetBases = {};
function isPublicAssetURL(id = "") {
  if (assets[id]) {
    return true;
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) {
      return true;
    }
  }
  return false;
}
function getAsset(id) {
  return assets[id];
}
const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = {
  gzip: ".gz",
  br: ".br",
  zstd: ".zst"
};
const _A02S4_ = defineHandler((event) => {
  if (event.req.method && !METHODS.has(event.req.method)) {
    return;
  }
  let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
  let asset;
  const encodingHeader = event.req.headers.get("accept-encoding") || "";
  const encodings = [...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.res.headers.delete("Cache-Control");
      throw new HTTPError({ status: 404 });
    }
    return;
  }
  if (encodings.length > 1) {
    event.res.headers.append("Vary", "Accept-Encoding");
  }
  const ifNotMatch = event.req.headers.get("if-none-match") === asset.etag;
  if (ifNotMatch) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  const ifModifiedSinceH = event.req.headers.get("if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  if (asset.type) {
    event.res.headers.set("Content-Type", asset.type);
  }
  if (asset.etag && !event.res.headers.has("ETag")) {
    event.res.headers.set("ETag", asset.etag);
  }
  if (asset.mtime && !event.res.headers.has("Last-Modified")) {
    event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !event.res.headers.has("Content-Encoding")) {
    event.res.headers.set("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.res.headers.has("Content-Length")) {
    event.res.headers.set("Content-Length", asset.size.toString());
  }
  return readAsset(id);
});
const findRouteRules = /* @__PURE__ */ (() => {
  const $0 = [{ name: "headers", route: "/assets/**", handler: headers, options: { "cache-control": "public, max-age=31536000, immutable" } }];
  return (m, p) => {
    let r = [];
    if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
    let s = p.split("/"), l = s.length;
    if (l > 1) {
      if (s[1] === "assets") {
        r.unshift({ data: $0, params: { "_": s.slice(2).join("/") } });
      }
    }
    return r;
  };
})();
const _lazy_T2vzIs = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
const findRoute = /* @__PURE__ */ (() => {
  const data = { route: "/**", handler: _lazy_T2vzIs };
  return ((_m, p) => {
    return { data, params: { "_": p.slice(1) } };
  });
})();
const globalMiddleware = [
  toEventHandler(_A02S4_)
].filter(Boolean);
const APP_ID = "default";
function useNitroApp() {
  let instance = useNitroApp._instance;
  if (instance) {
    return instance;
  }
  instance = useNitroApp._instance = createNitroApp();
  globalThis.__nitro__ = globalThis.__nitro__ || {};
  globalThis.__nitro__[APP_ID] = instance;
  return instance;
}
function createNitroApp() {
  const hooks = void 0;
  const captureError = (error, errorCtx) => {
    if (errorCtx?.event) {
      const errors = errorCtx.event.req.context?.nitro?.errors;
      if (errors) {
        errors.push({
          error,
          context: errorCtx
        });
      }
    }
  };
  const h3App = createH3App({ onError(error, event) {
    return errorHandler(error, event);
  } });
  let appHandler = (req) => {
    req.context ||= {};
    req.context.nitro = req.context.nitro || { errors: [] };
    return h3App.fetch(req);
  };
  const app = {
    fetch: appHandler,
    h3: h3App,
    hooks,
    captureError
  };
  return app;
}
function createH3App(config) {
  const h3App = new H3Core(config);
  h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
  h3App["~middleware"].push(...globalMiddleware);
  {
    h3App["~getMiddleware"] = (event, route) => {
      const pathname = event.url.pathname;
      const method = event.req.method;
      const middleware = [];
      {
        const routeRules = getRouteRules(method, pathname);
        event.context.routeRules = routeRules?.routeRules;
        if (routeRules?.routeRuleMiddleware.length) {
          middleware.push(...routeRules.routeRuleMiddleware);
        }
      }
      middleware.push(...h3App["~middleware"]);
      if (route?.data?.middleware?.length) {
        middleware.push(...route.data.middleware);
      }
      return middleware;
    };
  }
  return h3App;
}
function getRouteRules(method, pathname) {
  const m = findRouteRules(method, pathname);
  if (!m?.length) {
    return { routeRuleMiddleware: [] };
  }
  const routeRules = {};
  for (const layer of m) {
    for (const rule of layer.data) {
      const currentRule = routeRules[rule.name];
      if (currentRule) {
        if (rule.options === false) {
          delete routeRules[rule.name];
          continue;
        }
        if (typeof currentRule.options === "object" && typeof rule.options === "object") {
          currentRule.options = {
            ...currentRule.options,
            ...rule.options
          };
        } else {
          currentRule.options = rule.options;
        }
        currentRule.route = rule.route;
        currentRule.params = {
          ...currentRule.params,
          ...layer.params
        };
      } else if (rule.options !== false) {
        routeRules[rule.name] = {
          ...rule,
          params: layer.params
        };
      }
    }
  }
  const middleware = [];
  const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
  for (const rule of orderedRules) {
    if (rule.options === false || !rule.handler) {
      continue;
    }
    middleware.push(rule.handler(rule));
  }
  return {
    routeRules,
    routeRuleMiddleware: middleware
  };
}
function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
  process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
  process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
const tracingSrvxPlugins = [];
const _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
const port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
const host = process.env.NITRO_HOST || process.env.HOST;
const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const nitroApp = useNitroApp();
serve({
  port,
  hostname: host,
  tls: cert && key ? {
    cert,
    key
  } : void 0,
  fetch: nitroApp.fetch,
  plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
const nodeServer = {};
export {
  nodeServer as default
};
