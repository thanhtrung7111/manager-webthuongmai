export var hSession = "";
var process = false;
var LibList_MACOS =
  "viettel-ca_v6.dylib;viettel-ca_v5.dylib;viettel-ca_v4.dylib";
var LibList_WIN =
  "viettel-ca_v6.dll;viettel-ca_v5.dll;viettel-ca_v4.dll;viettel-ca_v2.dll";
var domain = "http://127.0.0.1:14007/";
// Create Base64 Object
// var Base64 = {
//   _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
//   encode: function (e: string) {
//     var t = "";
//     var n, r, i, s, o, u, a;
//     var f = 0;
//     e = Base64._utf8_encode(e);
//     while (f < e.length) {
//       n = e.charCodeAt(f++);
//       r = e.charCodeAt(f++);
//       i = e.charCodeAt(f++);
//       s = n >> 2;
//       o = ((n & 3) << 4) | (r >> 4);
//       u = ((r & 15) << 2) | (i >> 6);
//       a = i & 63;
//       if (isNaN(r)) {
//         u = a = 64;
//       } else if (isNaN(i)) {
//         a = 64;
//       }
//       t =
//         t +
//         this._keyStr.charAt(s) +
//         this._keyStr.charAt(o) +
//         this._keyStr.charAt(u) +
//         this._keyStr.charAt(a);
//     }
//     return t;
//   },
//   decode: function (e: string) {
//     var t = "";
//     var n, r, i;
//     var s, o, u, a;
//     var f = 0;
//     e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
//     while (f < e.length) {
//       s = this._keyStr.indexOf(e.charAt(f++));
//       o = this._keyStr.indexOf(e.charAt(f++));
//       u = this._keyStr.indexOf(e.charAt(f++));
//       a = this._keyStr.indexOf(e.charAt(f++));
//       n = (s << 2) | (o >> 4);
//       r = ((o & 15) << 4) | (u >> 2);
//       i = ((u & 3) << 6) | a;
//       t = t + String.fromCharCode(n);
//       if (u != 64) {
//         t = t + String.fromCharCode(r);
//       }
//       if (a != 64) {
//         t = t + String.fromCharCode(i);
//       }
//     }
//     t = Base64._utf8_decode(t);
//     return t;
//   },
//   _utf8_encode: function (e: string) {
//     e = e.replace(/\r\n/g, "\n");
//     var t = "";
//     for (var n = 0; n < e.length; n++) {
//       var r = e.charCodeAt(n);
//       if (r < 128) {
//         t += String.fromCharCode(r);
//       } else if (r > 127 && r < 2048) {
//         t += String.fromCharCode((r >> 6) | 192);
//         t += String.fromCharCode((r & 63) | 128);
//       } else {
//         t += String.fromCharCode((r >> 12) | 224);
//         t += String.fromCharCode(((r >> 6) & 63) | 128);
//         t += String.fromCharCode((r & 63) | 128);
//       }
//     }
//     return t;
//   },
//   _utf8_decode: function (e:string) {
//     var t = "";
//     var n = 0;
//     var r = (c1 = c2 = 0);
//     while (n < e.length) {
//       r = e.charCodeAt(n);
//       if (r < 128) {
//         t += String.fromCharCode(r);
//         n++;
//       } else if (r > 191 && r < 224) {
//         c2 = e.charCodeAt(n + 1);
//         t += String.fromCharCode(((r & 31) << 6) | (c2 & 63));
//         n += 2;
//       } else {
//         c2 = e.charCodeAt(n + 1);
//         c3 = e.charCodeAt(n + 2);
//         t += String.fromCharCode(
//           ((r & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
//         );
//         n += 3;
//       }
//     }
//     return t;
//   },
// };
// function showErrMsg_CMS(code: string) {
//   switch (code) {
//     case "100100":
//       alert("Lỗi: Không có chứng thư số.");
//       return false;
//       break;
//     case "100101":
//       alert("Lỗi: Tương tác SignPlugin.");
//       return false;
//       break;
//     case "100102":
//     case "100202":
//       alert(
//         "Lỗi: Chứng thư số không hợp lệ hoặc không có quyền sử dụng. Vui lòng F5 lại trình duyệt và thử lại"
//       );
//       return false;
//       break;
//     case "100103":
//     case "100205":
//     case "100303":
//       alert("Lỗi: Session không hợp lệ");
//       return false;
//       break;
//     case "100104":
//       alert("Lỗi: Chứng thư số hết hạn");
//       return false;
//       break;
//     case "100200":
//       alert("Lỗi: Dữ liệu không hợp lệ");
//       return false;
//       break;
//     case "100201":
//       alert("Lỗi: Không tìm thấy chứng thư số");
//       return false;
//       break;
//     case "100203":
//       alert("Lỗi: Lỗi trong quá trình ký");
//       return false;
//       break;
//     case "100204":
//       alert("Lỗi: Lỗi bộ nhớ không đủ");
//       return false;
//       break;
//     case "100300":
//       alert("Lỗi: Chữ ký không đúng định dạng");
//       return false;
//       break;
//     case "100301":
//       alert("Lỗi: Phân tích chứng thư số");
//       return false;
//       break;
//     case "100302":
//       alert("Lỗi: Chữ ký không hợp lệ");
//       return false;
//       break;
//     default:
//       alert("Lỗi: " + code);
//       return false;
//       break;
//   }
// }
// function showErrMsg_Docs(code: string) {
//   switch (code) {
//     case "100101":
//     case "100201":
//     case "100301":
//     case "101002":
//     case "101102":
//       alert("Lỗi: Chép file.");
//       return false;
//       break;
//     case "100102":
//     case "100202":
//     case "100302":
//       alert("Lỗi: Tài liệu bị mã hóa, không thể ký");
//       return false;
//       break;
//     case "100103":
//     case "100203":
//     case "100303":
//     case "100701":
//     case "100802":
//       alert("Lỗi: Không tìm thấy chứng thư số để ký");
//       return false;
//       break;
//     case "100104":
//     case "100204":
//     case "100304":
//     case "100803":
//       alert("Lỗi: Chứng thư số bị lỗi, không thể ký");
//       return false;
//       break;
//     case "100105":
//     case "100205":
//     case "100305":
//     case "100804":
//       alert(
//         "Lỗi: Chứng thư số không hợp lệ hoặc không có quyền sử dụng. Vui lòng F5 lại trình duyệt và thử lại"
//       );
//       return false;
//       break;
//     case "100106":
//     case "100206":
//     case "100306":
//     case "101003":
//     case "101103":
//       alert("Lỗi: Đọc file");
//       return false;
//       break;
//     case "100107":
//     case "100207":
//     case "100307":
//     case "100805":
//       alert("Lỗi: Lỗi trong quá trình ký");
//       return false;
//       break;
//     case "100400":
//     case "100401":
//       alert("Lỗi: Định dạng file không hỗ trợ");
//       return false;
//       break;
//     case "100402":
//       alert("Lỗi: Tên file quá dài");
//       return false;
//       break;
//     case "100403":
//       alert("Lỗi: Kích thước file quá lớn");
//       return false;
//       break;
//     case "100404":
//       alert("Lỗi: Chưa thiết lập link upload");
//       return false;
//       break;
//     case "100405":
//     case "100406":
//     case "100407":
//     case "100408":
//     case "101004":
//     case "101104":
//       alert("Lỗi: Lỗi trong quá trình upload file");
//       return false;
//       break;
//     case "100600":
//       alert("Lỗi: Hủy chọn file");
//       return false;
//       break;
//     case "100601":
//       alert("Lỗi: Hủy lưu file");
//       return false;
//       break;
//     case "100500":
//     case "101001":
//     case "101101":
//     case "101301":
//       alert("Lỗi: Input file");
//       return false;
//       break;
//     case "100501":
//       alert("Lỗi: Output file");
//       return false;
//       break;
//     case "100502":
//     case "100700":
//     case "100800":
//     case "101000":
//     case "101100":
//     case "101200":
//     case "101300":
//       alert("Lỗi: Session không hợp lệ");
//       return false;
//       break;
//     case "100801":
//       alert("Lỗi: Dữ liệu XML không đúng định dạng");
//       return false;
//       break;
//     case "100502":
//       alert("Lỗi: Session không hợp lệ");
//       return false;
//       break;
//     case "101201":
//       alert("Lỗi: Định dạng thời gian không đúng");
//       return false;
//       break;
//     default:
//       alert("Lỗi: " + code);
//       return false;
//       break;
//   }
// }

export function initPlugin() {
  //=================>>Check OS<<=================
  var OSName = "Unknown";
  if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1)
    OSName = "Windows 8";
  if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1)
    OSName = "Windows 7";
  if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1)
    OSName = "Windosws Vista";
  if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1)
    OSName = "Windows XP";
  if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1)
    OSName = "Windows 2000";
  if (window.navigator.userAgent.indexOf("Mac") != -1) OSName = "Mac/iOS";
  if (window.navigator.userAgent.indexOf("X11") != -1) OSName = "UNIX";
  if (window.navigator.userAgent.indexOf("Linux") != -1) OSName = "Linux";
  //=================>>Check OS<<=================

  var xmlhttp: XMLHttpRequest;
  var response = "";
  //   document.getElementById("xml_Data").value =
  //     '<?xml version="1.0" encoding="UTF-8"?>\
  // <xml>\
  // <note Id="data">\
  // <to>Tove</to>\
  // <from>Jani</from>\
  // <heading>Reminder</heading>\
  // <body>Don\'t forget me this weekend!</body>\
  // </note>\
  // </xml>';
  // if (window.XMLHttpRequest) {
  // code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp = new XMLHttpRequest();
  // } else {
  //   // code for IE6, IE5
  //   xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  // }
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      response = xmlhttp.responseText;
      alert("res = " + response);
      process = false;
      if (response != "") {
        hSession = response;
        return;
      }
      if (response == "") {
        alert(
          "Vui long cai dat SignPlugin hoac cam Token vao may va bam f5 de thu lai"
        );
        window.open("./signplugin_viettel-ca_installer.exe");
        return;
      }
    }
  };
  xmlhttp.open("POST", domain + "getSession", true);
  if (OSName == "Mac/iOS") {
    xmlhttp.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded"
    );
    xmlhttp.send("liblist=" + LibList_MACOS);
  } else if (OSName == "UNIX" || OSName == "Linux") {
    alert("Not Support");
  } else {
    xmlhttp.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded"
    );
    xmlhttp.send("liblist=" + LibList_WIN);
    //xmlhttp.send();
  }
}
function getCertifcate() {
  if (process == true) return;
  var ReqCert: XMLHttpRequest;
  // if (window.XMLHttpRequest) {
  // code for IE7+, Firefox, Chrome, Opera, Safari
  ReqCert = new XMLHttpRequest();
  // } else {
  //   // code for IE6, IE5
  //   ReqCert = new ActiveXObject("Microsoft.XMLHTTP");
  // }
  // ReqCert.onreadystatechange = function () {
  //   if (ReqCert.readyState == 4 && ReqCert.status == 200) {
  //     // document.getElementById("cert_rawData").value = ReqCert.responseText;
  //     //get info of certificate
  //     if (document.getElementById("cert_rawData").value == "") {
  //       document.getElementById("cert_SNB").value = "";
  //       document.getElementById("cert_CN").value = "";
  //       document.getElementById("cert_DN").value = "";
  //       document.getElementById("cert_Issuer").value = "";
  //       document.getElementById("cert_ValidFrom").value = "";
  //       document.getElementById("cert_ValidTo").value = "";
  //       //get infomation error
  //       //get serial number
  //       var ReqLastErr;
  //       if (window.XMLHttpRequest) {
  //         // code for IE7+, Firefox, Chrome, Opera, Safari
  //         ReqLastErr = new XMLHttpRequest();
  //       } else {
  //         // code for IE6, IE5
  //         ReqLastErr = new ActiveXObject("Microsoft.XMLHTTP");
  //       }
  //       ReqLastErr.onreadystatechange = function () {
  //         if (ReqLastErr.readyState == 4 && ReqLastErr.status == 200) {
  //           process = false;
  //           //alert("Error code = " +ReqLastErr.responseText);
  //           showErrMsg_CMS(ReqLastErr.responseText);
  //         }
  //       };
  //       ReqLastErr.open("POST", domain + "getLastErr", true);
  //       ReqLastErr.send();
  //     } else {
  //       //get serial number
  //       var ReqSNB;
  //       if (window.XMLHttpRequest) {
  //         // code for IE7+, Firefox, Chrome, Opera, Safari
  //         ReqSNB = new XMLHttpRequest();
  //       } else {
  //         // code for IE6, IE5
  //         ReqSNB = new ActiveXObject("Microsoft.XMLHTTP");
  //       }
  //       ReqSNB.onreadystatechange = function () {
  //         if (ReqSNB.readyState == 4 && ReqSNB.status == 200) {
  //           document.getElementById("cert_SNB").value = ReqSNB.responseText;
  //         }
  //       };
  //       ReqSNB.open("POST", domain + "getCertSNB", true);
  //       ReqSNB.send();

  //       //get CN
  //       var ReqCN;
  //       if (window.XMLHttpRequest) {
  //         // code for IE7+, Firefox, Chrome, Opera, Safari
  //         ReqCN = new XMLHttpRequest();
  //       } else {
  //         // code for IE6, IE5
  //         ReqCN = new ActiveXObject("Microsoft.XMLHTTP");
  //       }
  //       ReqCN.onreadystatechange = function () {
  //         if (ReqCN.readyState == 4 && ReqCN.status == 200) {
  //           document.getElementById("cert_CN").value = ReqCN.responseText;
  //         }
  //       };
  //       ReqCN.open("POST", domain + "getCertCN", true);
  //       ReqCN.send();

  //       //get DN
  //       var ReqDN;
  //       if (window.XMLHttpRequest) {
  //         // code for IE7+, Firefox, Chrome, Opera, Safari
  //         ReqDN = new XMLHttpRequest();
  //       } else {
  //         // code for IE6, IE5
  //         ReqDN = new ActiveXObject("Microsoft.XMLHTTP");
  //       }
  //       ReqDN.onreadystatechange = function () {
  //         if (ReqDN.readyState == 4 && ReqDN.status == 200) {
  //           document.getElementById("cert_DN").value = ReqDN.responseText;
  //         }
  //       };
  //       ReqDN.open("POST", domain + "getCertDN", true);
  //       ReqDN.send();

  //       //get issuer
  //       var ReqIssuer;
  //       if (window.XMLHttpRequest) {
  //         // code for IE7+, Firefox, Chrome, Opera, Safari
  //         ReqIssuer = new XMLHttpRequest();
  //       } else {
  //         // code for IE6, IE5
  //         ReqIssuer = new ActiveXObject("Microsoft.XMLHTTP");
  //       }
  //       ReqIssuer.onreadystatechange = function () {
  //         if (ReqIssuer.readyState == 4 && ReqIssuer.status == 200) {
  //           document.getElementById("cert_Issuer").value =
  //             ReqIssuer.responseText;
  //         }
  //       };
  //       ReqIssuer.open("POST", domain + "getCertIssuer", true);
  //       ReqIssuer.send();

  //       //get valid from
  //       var ReqValidDate;
  //       if (window.XMLHttpRequest) {
  //         // code for IE7+, Firefox, Chrome, Opera, Safari
  //         ReqValidDate = new XMLHttpRequest();
  //       } else {
  //         // code for IE6, IE5
  //         ReqValidDate = new ActiveXObject("Microsoft.XMLHTTP");
  //       }
  //       ReqValidDate.onreadystatechange = function () {
  //         if (ReqValidDate.readyState == 4 && ReqValidDate.status == 200) {
  //           document.getElementById("cert_ValidFrom").value =
  //             ReqValidDate.responseText;
  //         }
  //       };
  //       ReqValidDate.open("POST", domain + "getCertValidDate", true);
  //       ReqValidDate.send();

  //       //get expire date
  //       var ReqExpireDate;
  //       if (window.XMLHttpRequest) {
  //         // code for IE7+, Firefox, Chrome, Opera, Safari
  //         ReqExpireDate = new XMLHttpRequest();
  //       } else {
  //         // code for IE6, IE5
  //         ReqExpireDate = new ActiveXObject("Microsoft.XMLHTTP");
  //       }
  //       ReqExpireDate.onreadystatechange = function () {
  //         if (ReqExpireDate.readyState == 4 && ReqExpireDate.status == 200) {
  //           document.getElementById("cert_ValidTo").value =
  //             ReqExpireDate.responseText;
  //           process = false;
  //         }
  //       };
  //       ReqExpireDate.open("POST", domain + "getCertExpireDate", true);
  //       ReqExpireDate.send();
  //     }
  //   } else process = true;
  // };
  ReqCert.open("POST", domain + "getCertificate", true);
  ReqCert.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  ReqCert.send("sessionID=" + hSession);
}
// function signData() {
//   if (process == true) return;
//   // var text = document.getElementById("sign_Data").value;
//   if (text == "") {
//     alert("Vui long nhap van ban de ky");
//     return;
//   }
//   text = Base64.encode(text);

//   var xmlhttp;
//   if (window.XMLHttpRequest) {
//     // code for IE7+, Firefox, Chrome, Opera, Safari
//     xmlhttp = new XMLHttpRequest();
//   } else {
//     // code for IE6, IE5
//     xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
//   }
//   xmlhttp.onreadystatechange = function () {
//     if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//       document.getElementById("sign_Signature").value = xmlhttp.responseText;
//       if (document.getElementById("sign_Signature").value == "") {
//         //get infomation error
//         var ReqLastErr;
//         if (window.XMLHttpRequest) {
//           // code for IE7+, Firefox, Chrome, Opera, Safari
//           ReqLastErr = new XMLHttpRequest();
//         } else {
//           // code for IE6, IE5
//           ReqLastErr = new ActiveXObject("Microsoft.XMLHTTP");
//         }
//         ReqLastErr.onreadystatechange = function () {
//           if (ReqLastErr.readyState == 4 && ReqLastErr.status == 200) {
//             //alert("Error code = " +ReqLastErr.responseText);
//             showErrMsg_CMS(ReqLastErr.responseText);
//             process = false;
//           }
//         };
//         ReqLastErr.open("POST", domain + "getLastErr", true);
//         ReqLastErr.send();
//       } else process = false;
//     } else process = true;
//   };
//   xmlhttp.open("POST", domain + "Sign", true);
//   xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//   xmlhttp.send("sessionID=" + hSession + "&inData=" + text);
// }
// function verifySignature() {
//   if (process == true) return;
//   var msg = document.getElementById("sign_Data").value;
//   var signature = document.getElementById("sign_Signature").value;
//   if (signature == "") {
//     document.getElementById("verify_Signature").value = "";
//     alert("Vui long nhap chu ky");
//     return;
//   }
//   msg = Base64.encode(msg);
//   var xmlhttp;
//   if (window.XMLHttpRequest) {
//     // code for IE7+, Firefox, Chrome, Opera, Safari
//     xmlhttp = new XMLHttpRequest();
//   } else {
//     // code for IE6, IE5
//     xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
//   }
//   xmlhttp.onreadystatechange = function () {
//     if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//       document.getElementById("verify_Signature").value = xmlhttp.responseText;
//       if (document.getElementById("verify_Signature").value == "") {
//         //get infomation error
//         var ReqLastErr;
//         if (window.XMLHttpRequest) {
//           // code for IE7+, Firefox, Chrome, Opera, Safari
//           ReqLastErr = new XMLHttpRequest();
//         } else {
//           // code for IE6, IE5
//           ReqLastErr = new ActiveXObject("Microsoft.XMLHTTP");
//         }
//         ReqLastErr.onreadystatechange = function () {
//           if (ReqLastErr.readyState == 4 && ReqLastErr.status == 200) {
//             //alert("Error code = " +ReqLastErr.responseText);
//             showErrMsg_CMS(ReqLastErr.responseText);
//             process = false;
//           }
//         };
//         ReqLastErr.open("POST", domain + "getLastErr", true);
//         ReqLastErr.send();
//       } else process = false;
//     } else process = true;
//   };
//   xmlhttp.open("POST", domain + "Verify", true);
//   xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//   xmlhttp.send(
//     "sessionID=" + hSession + "&signature=" + signature + "&inData=" + msg
//   );
// }
// function browseFile() {
//   if (process == true) return;
//   var reqOpen;
//   if (window.XMLHttpRequest) {
//     // code for IE7+, Firefox, Chrome, Opera, Safari
//     reqOpen = new XMLHttpRequest();
//   } else {
//     // code for IE6, IE5
//     reqOpen = new ActiveXObject("Microsoft.XMLHTTP");
//   }
//   reqOpen.onreadystatechange = function () {
//     if (reqOpen.readyState == 4 && reqOpen.status == 200) {
//       document.getElementById("file_input").value = reqOpen.responseText;
//       if (document.getElementById("file_input").value == "") {
//         document.getElementById("file_signed").value = "";
//         process = false;
//       } else {
//         //save file
//         var reqSave;
//         if (window.XMLHttpRequest) {
//           // code for IE7+, Firefox, Chrome, Opera, Safari
//           reqSave = new XMLHttpRequest();
//         } else {
//           // code for IE6, IE5
//           reqSave = new ActiveXObject("Microsoft.XMLHTTP");
//         }
//         reqSave.onreadystatechange = function () {
//           if (reqSave.readyState == 4 && reqSave.status == 200) {
//             document.getElementById("file_signed").value = reqSave.responseText;
//             process = false;
//           }
//         };
//         reqSave.open("POST", domain + "SaveFile", true);
//         reqSave.send();
//       }
//     } else process = true;
//   };
//   reqOpen.open("POST", domain + "OpenFile", true);
//   reqOpen.send();
// }
// function saveFile() {
//   if (process == true) return;
//   //save file
//   var reqSave;
//   if (window.XMLHttpRequest) {
//     // code for IE7+, Firefox, Chrome, Opera, Safari
//     reqSave = new XMLHttpRequest();
//   } else {
//     // code for IE6, IE5
//     reqSave = new ActiveXObject("Microsoft.XMLHTTP");
//   }
//   reqSave.onreadystatechange = function () {
//     if (reqSave.readyState == 4 && reqSave.status == 200) {
//       document.getElementById("file_signed").value = reqSave.responseText;
//       process = false;
//     } else process = true;
//   };
//   reqSave.open("POST", domain + "SaveFile", true);
//   reqSave.send();
// }

export function signFile() {
  if (process == true) return;
  // var inputFile = document.getElementById("file_input").value;
  // var outputFile = document.getElementById("file_signed").value;
  //inputFile = "C:\\";
  //outputFile = "hello out";
  /*
	if (inputFile == "")
	{
		alert("Vui long chon file de ky");
		return;
	}
	if (outputFile == "")
	{
		alert("Vui long chon file de luu");
		return;
	}//*/
  var reqSignFile: XMLHttpRequest;
  // if (window.XMLHttpRequest) {
  //   // code for IE7+, Firefox, Chrome, Opera, Safari
  reqSignFile = new XMLHttpRequest();
  // } else {
  //   // code for IE6, IE5
  //   reqSignFile = new ActiveXObject("Microsoft.XMLHTTP");
  // }
  reqSignFile.onreadystatechange = function () {
    if (reqSignFile.readyState == 4 && reqSignFile.status == 200) {
      var ret = reqSignFile.responseText;
      if (ret != "") {
        alert("Ky file thanh cong: " + ret);
        process = false;
      } else {
        //get infomation error
        var ReqLastErr: XMLHttpRequest;

        ReqLastErr = new XMLHttpRequest();

        ReqLastErr.onreadystatechange = function () {
          if (ReqLastErr.readyState == 4 && ReqLastErr.status == 200) {
            //alert("Error code = " +ReqLastErr.responseText);
            showErrMsg_Docs(ReqLastErr.responseText);
            process = false;
          }
        };
        ReqLastErr.open("POST", domain + "getLastErr", true);
        ReqLastErr.send();
      }
    } else process = true;
  };
  reqSignFile.open("POST", domain + "fileSign", true);
  reqSignFile.setRequestHeader(
    "Content-type",
    "application/x-www-form-urlencoded"
  );
  reqSignFile.send(
    "sessionID=" +
      hSession +
      "&inputFile=" +
      "E:\\file2.pdf" +
      "&outputFile=" +
      "E:\\file2_demo.pdf" +
      "&xmlSignType=0" +
      "&tagXMLData=data"
  );
}

// function signXMLData() {
//   if (process == true) return;
//   var text = Base64.encode(document.getElementById("xml_Data").value);
//   //var text = document.getElementById('xml_Data').value;
//   if (text == "") {
//     alert("Vui long nhap van ban de ky");
//     return;
//   }
//   var xmlhttp;
//   if (window.XMLHttpRequest) {
//     // code for IE7+, Firefox, Chrome, Opera, Safari
//     xmlhttp = new XMLHttpRequest();
//   } else {
//     // code for IE6, IE5
//     xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
//   }
//   xmlhttp.onreadystatechange = function () {
//     if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//       var result = xmlhttp.responseText;

//       if (result == "") {
//         //get infomation error
//         var ReqLastErr;
//         if (window.XMLHttpRequest) {
//           // code for IE7+, Firefox, Chrome, Opera, Safari
//           ReqLastErr = new XMLHttpRequest();
//         } else {
//           // code for IE6, IE5
//           ReqLastErr = new ActiveXObject("Microsoft.XMLHTTP");
//         }
//         ReqLastErr.onreadystatechange = function () {
//           if (ReqLastErr.readyState == 4 && ReqLastErr.status == 200) {
//             //alert("Error code = " +ReqLastErr.responseText);
//             showErrMsg_Docs(ReqLastErr.responseText);
//             process = false;
//           }
//         };
//         ReqLastErr.open("POST", domain + "getLastErr", true);
//         ReqLastErr.send();
//       } else {
//         document.getElementById("xml_Signature").value = Base64.decode(result);
//         //document.getElementById('xml_Signature').value=result;
//         process = false;
//       }
//     } else process = true;
//   };
//   xmlhttp.open("POST", domain + "signXMLData", true);
//   xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//   xmlhttp.send(
//     "sessionID=" +
//       hSession +
//       "&xmlData=" +
//       text +
//       "&signType=0" +
//       "&tagXMLData=*"
//   );
// }
