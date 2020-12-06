var textA, textB;																				//создаем переменные для хранения текста полученного из файлов
var file1_name, file2_name;

function loadFile(elem){																		//функция получения текста из файла
	let file = elem.files[0];																	// получаем файл 
	let reader = new FileReader();																// создаем новый объект для чтения из файла
	if(file != undefined){
		reader.readAsText(file);																//читаем файл как текстовый
		reader.onload = function(){																//если успешно прочитан то выполняется функция
			if(elem.id == "file1"){																//если обрабатывается первый файл то
				textA = reader.result;															//сохраняем в переменную textA текст из файла
				file1_name = file.name;
				document.getElementById("o_f1").classList.add("opened_file");
				document.getElementById("o_f1").classList.remove('open_file');
				document.getElementById("o_f1").innerText = file.name;
			}else if(elem.id = "file2"){														// если обрабатывается второй файл то
				textB = reader.result;															//сохраняем в переменную textB текст из файла
				file2_name = file.name;
				document.getElementById("o_f2").classList.add("opened_file");
				document.getElementById("o_f2").classList.remove('open_file');
				document.getElementById("o_f2").innerText = file.name;
			}
		}
	}
}
		
		
function comparison(f1_text, f2_text){
	let f1_obj = JSON.parse(f1_text); 															//преобразуем json строку полученную из первого файла в javascript объект
	let f2_obj = JSON.parse(f2_text);															//преобразуем json строку полученную из второго файла в javascript объект
	var result_text = "";																		// создаем переменную для сохраниения результата сравнения
		
	for (key in f1_obj) { 																		// перебираем все свойства первого объекта
		if(f2_obj[key] != undefined){															 // если свойство key первого объекта существует во втором то
			if(f2_obj[key] == f1_obj[key]){														 // если значение свойства первого объекта равно значению второго объекта то
				result_text += " " + key + ": " + f1_obj[key] + "\n"; 							// добавляем к результату ключ и значение без знака
			}else{																				//если значения не равны то
				result_text += "-" + key + ": " + f1_obj[key] + "\n";							//добавляем к результату значение первого файла со знаком минус
				result_text += "+" + key + ": " + f2_obj[key] + "\n";							//добавляем к результату значение второго объекта со знаком плюс
			}
		}else{																					// если свойства первого объекта не существует во втором то
				result_text += "-" + key + ": " + f1_obj[key] + "\n";							// добавляем к результату значение со знаком минус
		}
	}
		
	for(key in f2_obj){																			//перебираем свойства второго объекта
		if(f1_obj[key] == undefined){															// если свойство не существует в первом объекте то
			result_text += "+" + key + ": " + f2_obj[key] + "\n";								//добавляем к результату это свойство со значением +
		}
	}
		
	print_result(result_text);
				
}
				
function print_result(result_text){
	document.getElementById("file1_text").innerText = textA;
	document.getElementById("area1_name").innerText = "Файл: " + file1_name;
	document.getElementById("file2_text").innerText = textB;
	document.getElementById("area2_name").innerText = "Файл: " + file2_name;
	document.getElementById("result_text").innerText = result_text;
	document.getElementById("result").style.display = "block";
}
				
window.onload = function(){
	document.getElementById("comparison_button").onclick = function(){
		if(textA != undefined && textB != undefined){
			comparison(textA, textB);
			document.getElementById("errors").innerText = "";
		}else{
			document.getElementById("errors").innerText = "Ошибка! Выберите два json файла";
		}
	}
}