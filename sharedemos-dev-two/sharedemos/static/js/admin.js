var globalVar =0;

$(document).ready(function(){			
	$.each(hotspotsId_list, function(indx, id_val1){
		//Displaying the existing hotspots onto the slide Image 				
		var disp_data = $('#'+id_val1+'-display').val();
		var jsonData = jQuery.parseJSON((disp_data.replace(/u/g,"")).replace(/'/g, '"'));
		$('#'+id_val1).css({
			"top" : jsonData.top,
			"left" : jsonData.left,
			"width" : jsonData.width,
			"height" : jsonData.height
		});
		var callout_data = $('#'+id_val1+'-callout').val();
		var callout_string_data = callout_data.replace(/u/g,"").replace(/'/g, '"');
		
		$('#'+id_val1+'-callout').val(callout_string_data);
		$('#'+id_val1+'-delete').attr({'usr_id': id_val1, 'onclick': "delHotspot($(this).attr('usr_id'))"});
		$('#'+id_val1+'-display').attr({'usr_id': id_val1, 'onchange': "updateHotspot($(this).attr('usr_id'))"});
		$('#'+id_val1).attr({'onclick':"hideHotspotDetails($(this).attr('id'),globalVar), modifyHotspotDetails($(this).attr('id')), showHotspotDetails($(this).attr('id'))"});				
		modifyHotspotDetails(id_val1);
		hideHotspotDetails();
		updateHotspot(id_val1);
		globalVar = parseInt(id_val1.split('-')[1]);
	});

	//Create new hotspots
	var bg = $('#BG_Image');
	var gen_box = null, i=1, width, height,
				  x_begin, x_end, y_begin, y_end;
	
	bg.selectable({
		start: function(e) {
	        //get the mouse position on start
	        x_begin = e.pageX,
	        y_begin = e.pageY;
    	},
		stop: function(e){
			x_end = e.pageX,
			y_end = e.pageY;
			
			if (x_end - x_begin >=1){
				width = x_end - x_begin,
				height = y_end - y_begin;
				var drag_right = true;
			} else {
				width = x_begin - x_end,
				height = y_end - y_begin;
				var drag_left = true;
			}			
			if(width > 5 || height > 10){
				globalVar +=1;
				$(this).append(' <div id ="Hotspots-'+globalVar+'" class="gen_box_'+i+ '"></div> ');
				gen_box = $('.gen_box_'+i);
				var id = 'Hotspots-'+globalVar;					
				$('#Hotspots-'+globalVar).attr('onclick', "populateHsData(id), showHotspotDetails(id), hideHotspotDetails(id, globalVar)");
				$(gen_box).css({
					'border': '3px solid #ff9600', 
					'-webkit-box-sizing': 'content-box',
					'-moz-box-sizing': 'content-box',
					'box-sizing': 'content-box',
					'cursor': 'pointer',						
					'width'     : width,
					'height'    : height,
					'position'  : 'absolute',
					'left'      : x_begin,
					'top'         : y_begin
				})
				.draggable({containment: "#BG_Image"})
				.resizable({handles:'all', containment: "#BG_Image"});


				drag_right? $(gen_box).offset({left: x_begin, top: y_begin}): false;
				drag_left? $(gen_box).offset({left: x_end, top: y_begin}): false;
								
				i++;
				createTextArea(globalVar);
				populateHsData(id);
				showHotspotDetails(id);
				hideHotspotDetails(id, globalVar);
			}
		}								
	});
				
});

//Function to create new hotspot elements.
function createTextArea(id) {			
				
	var divField = "<div id ='HotspotsDiv'></div>";
	var field1 = "Display <textarea id='Display' name ='Display'> </textarea>";
	var field2 = "Actions <textarea id='Action' name ='Action'> </textarea>";
	var field3 = "HotspotType <select id='HotspotType' name='HotspotType'><option value='link'>Link</option><option value='goto'>Goto</option></select>"
	var field4 = "Callout <textarea id='Callout' name ='Callout'> </textarea>";
	var field5 = "Delete <input id='Delete' name='Delete' type='checkbox' value='y'>";
	var br_field = "<br> </br>";

	$('#newFields').append(divField);
	$('#HotspotsDiv').append(field1, field2, field3, br_field, field4, field5, br_field);

	var hs_name = 'Hotspots-'+id;
	$('#HotspotsDiv').attr({'id': hs_name+'-div', 'name':hs_name+'-div'});
	$('#Display').attr({'id': hs_name+'-display', 'name': hs_name+'-display', 'usr_id': hs_name, 'onchange':"updateHotspot($(this).attr('usr_id'))"});
	$('#Action').attr({'id': hs_name+'-action', 'name': hs_name+'-action'});
	$('#HotspotType').attr({'id': hs_name+'-hs_type', 'name': hs_name+'-hs_type'});
	$('#Callout').attr({'id': hs_name+'-callout', 'name': hs_name+'-callout'});
	$('#Delete').attr({'id': hs_name+'-delete', 'name': hs_name+'-delete', 'usr_id': hs_name, 'onclick': "delHotspot($(this).attr('usr_id'))"});			
}

//Function to Populate data inside newly created Hotspot elements.
function populateHsData(id){

	var id_str = id.toString();	
	var newHotspot = $('#'+id_str);
	var newTextarea = $('#'+id_str+'-display');
	
	var top_data = parseInt(newHotspot.css('top')) * 100 / 630;
	var left_data = parseInt(newHotspot.css('left')) * 100 / 1120;
	var width_data = parseInt(newHotspot.css('width')) * 100 / 1120;
	var height_data = parseInt(newHotspot.css('height')) * 100 / 630;
	var color_data = newHotspot.css("border-top-color");
	
	var dispItem = {};
	var actionItem = {};
	var calloutItem = {};
	dispItem["width"] = ""+width_data.toFixed(2)+"%";
	dispItem["top"] = ""+top_data.toFixed(2)+"%";
	dispItem["height"] = ""+height_data.toFixed(2)+"%";
	dispItem["left"] = ""+left_data.toFixed(2)+"%";
	if (newHotspot.css('border-top-style') == "dotted"){
		dispItem["color"] = "transparent";
	}
	else{
		dispItem["color"] = color_data;	
	}
	$('#'+id_str+'-display').val(JSON.stringify(dispItem));

	if($('#'+id_str+'-action').val().length <= 1 ){
		$('#'+id_str+'-action').val(JSON.stringify(actionItem));
	}	
	if($('#'+id_str+'-callout').val().length <= 1 ){ 
		$('#'+id_str+'-callout').val(JSON.stringify(calloutItem));
	}
}

//Function to hide all Hotspots details.
function hideHotspotDetails(id, globalVar){	
	if (globalVar == 'none' || globalVar == undefined){		
		$.each(hotspotsId_list, function(indx, id_val){
			if (id_val != id ){
				$('#'+id_val+'-div').css({
					'display': 'none'
				});
			}
		});
	}
	if(globalVar != undefined ){
		var id_val = parseInt(id.toString().split('-')[1]);					
		for(var i=0;i<=globalVar;i++){
			if(id_val != i){							
				$('#Hotspots-'+i+'-div').css({
					'display': 'none'
				});
			}					
		}
	}			
}

//Function to show a specific Hotspot details.
function showHotspotDetails(id){			
	$('#'+id.toString()+'-div').css({
			'display': ''
		});
}

//Function to modify the parameters/details of the hotspots .
function modifyHotspotDetails(id) {

	var hs = $("#"+id);			
	hs.draggable({containment: "#BG_Image"});
	hs.resizable({handles:'all', containment: "#BG_Image"});
	var id_str = id.toString();

	var disp_area = $("#"+id_str+'-display').val();
	var disp_jData = jQuery.parseJSON((disp_area.replace(/u'/g,"'")).replace(/'/g, '"'));
	var top_data = hs.position().top * 100 / 630;
	var left_data = hs.position().left * 100 / 1120;
	var width_data = hs.width() * 100 / 1120;
	var height_data = hs.height() * 100 / 630;

	disp_jData.top = ""+top_data.toFixed(2)+"%";
	disp_jData.left = ""+left_data.toFixed(2)+"%";
	disp_jData.width = ""+width_data.toFixed(2)+"%";
	disp_jData.height = ""+height_data.toFixed(2)+"%";

	var actionData = {};
	var calloutData = {};

	if ($("#"+id_str+'-action').val().length <= 1){
		$('#'+id_str+'-action').val(JSON.stringify(actionData));
	}
	if($('#'+id_str+'-callout').val().length <= 1 ){ 
		$('#'+id_str+'-callout').val(JSON.stringify(calloutData));
	}
	$("#"+id_str+'-display').val(JSON.stringify(disp_jData));		
}

//Function to gray out the hotspots when delete is checked.
function delHotspot(id){
	var id_str = id.toString();
	if ($('#'+id_str+'-delete').is(':checked'))
	{				
		$('#'+id_str).css({
			'border': '3px solid rgb(182, 182, 182)',
			'background' : 'rgba(182, 182, 182, 0.3)'
		});				
		$('#'+id_str).resizable('disable');
	}
	else{
		$('#'+id_str).css({
			'border': '3px solid #ff9600',
			'background' : ''
		});				
		$('#'+id_str).resizable('enable');
	}

}

//Function to update hotspots on the slide when values are edited
function updateHotspot(id){			
	var hsDisp_Jdata = JSON.parse($('#'+id+'-display').val());
	$.each(hsDisp_Jdata, function(ele, data){
		if( ele != 'color'){
			$('#'+id).css(ele, data);
	}
	});
	if(hsDisp_Jdata.color != undefined){
		if(hsDisp_Jdata.color == 'transparent'){
			$('#'+id).css('border-style','dotted');
		}
		else{
			$('#'+id).css('border-top-color',hsDisp_Jdata.color);
			$('#'+id).css('border-right-color',hsDisp_Jdata.color);
			$('#'+id).css('border-bottom-color',hsDisp_Jdata.color);
			$('#'+id).css('border-left-color',hsDisp_Jdata.color);
			$('#'+id).css('border-style','solid');
		}
	}
	else{
		$('#'+id).css('border','3px solid #ff9600');
	}
}
