const headStr = `
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
  <style>
    @font-face{font-family: "SimSun";src:url('{fontPath}/simsun.ttf') format('truetype');}
    @font-face{font-family: "NSimSun";src:url('{fontPath}/nsimsun.ttf') format('truetype');}
    @font-face{font-family: "FangSong";src:url('{fontPath}/simfang.ttf') format('truetype');}
    @font-face{font-family: "KaiTi";src:url('{fontPath}/simkai.ttf') format('truetype');}
    @font-face{font-family: "SimHei";src:url('{fontPath}/simhei.ttf') format('truetype');}
    @font-face{font-family: "Microsoft YaHei";src:url('{fontPath}/msyh.ttf') format('truetype');}
    @font-face{font-family: "Times New Roman";src:url('{fontPath}/times.ttf') format('truetype');}
    @font-face{font-family: "LiSu";src:url('{fontPath}/simli.ttf') format('truetype');}
    @font-face{font-family: "YouYuan";src:url('{fontPath}/simyou.ttf') format('truetype');}
    .w-e-text-container p{margin-top:0; margin-bottom:0;}
  </style>
</head>
<body style="margin: 0">
`

const footStr = `
</body></html>`

const openFixedAreaStr = `
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="content-type" content="text/html;charset=utf-8">
  <style>
    @font-face{font-family: "SimSun";src:url('{fontPath}/simsun.ttf') format('truetype');}
    @font-face{font-family: "NSimSun";src:url('{fontPath}/nsimsun.ttf') format('truetype');}
    @font-face{font-family: "FangSong";src:url('{fontPath}/simfang.ttf') format('truetype');}
    @font-face{font-family: "KaiTi";src:url('{fontPath}/simkai.ttf') format('truetype');}
    @font-face{font-family: "SimHei";src:url('{fontPath}/simhei.ttf') format('truetype');}
    @font-face{font-family: "Microsoft YaHei";src:url('{fontPath}/msyh.ttf') format('truetype');}
    @font-face{font-family: "Times New Roman";src:url('{fontPath}/times.ttf') format('truetype');}
    @font-face{font-family: "LiSu";src:url('{fontPath}/simli.ttf') format('truetype');}
    @font-face{font-family: "YouYuan";src:url('{fontPath}/simyou.ttf') format('truetype');}
    p{margin-top:0; margin-bottom:0;}
  </style>
	<script>
		function subst() {
			var vars = {};
			var query_strings_from_url = document.location.search.substring(1).split('&');
			for (var query_string in query_strings_from_url) {
				if (query_strings_from_url.hasOwnProperty(query_string)) {
					var temp_var = query_strings_from_url[query_string].split('=', 2);
					vars[temp_var[0]] = decodeURI(temp_var[1]);
				}
			}
			var css_selector_classes = ['page', 'frompage', 'topage', 'webpage', 'section', 'subsection', 'date', 'isodate', 'time', 'title', 'doctitle', 'sitepage', 'sitepages'];
			for (var css_class in css_selector_classes) {
				if (css_selector_classes.hasOwnProperty(css_class)) {
					var element = document.getElementsByClassName(css_selector_classes[css_class]);
					for (var j = 0; j < element.length; ++j) {
						element[j].textContent = vars[css_selector_classes[css_class]];
					}
          element = null;
				}
			}
		}
	</script>
</head>
<body style="border:0; margin: 0;" onload="subst()">`

const pageStrStyle = '<table style="width: 100%;position:absolute;right:2px;top:2px">'
const pageStrStyleB = '<table style="width: 100%;position:absolute;bottom:2px;right:2px;">'
const pageStr1 = `
  <tr>
    <td class="section"></td>
    <td style="text-align:right">
      第 <span class="page"></span> 页
    </td>
  </tr>
</table>
`

const pageStr2 = `
  <tr>
    <td class="section"></td>
    <td style="text-align:right">
      第 <span class="page"></span> / <span class="topage"></span> 页
    </td>
  </tr>
</table>
`

export {
  headStr,
  footStr,
  openFixedAreaStr,
  pageStr1,
  pageStr2,
  pageStrStyle,
  pageStrStyleB
}