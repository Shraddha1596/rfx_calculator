// Code goes here

$(document).ready(function(){

	$("#calculate").click(function(){
		calculateTotal();
	});

	$("a[name=copy_result]").click(function() {
		copy();
	});

	$("#reset_value").click(function(){
		reset();
	});
	$(".signed_radio input[type=radio]").on("change", function () {
		input_change();
	});

	function input_change(){

		var sign1 = $("input[name='signed_radio_option']:checked").val();
		if (sign1 == "no") {
			$(".signed_radio_ifno").show();
		}
		else {
			$(".signed_radio_ifno").hide();
		}
		
		
	}

	function calculateTotal(){

		var bodyParts, pages, sign1, sign2, pageOverage, overageFactor, overageFee, bodyPartTotal, signature, grandTotal;

		var overageCost = 125;
		var bodyPartCost = 350;
		var signatureCost = 200;

		bodyParts = $("#bodyParts").val();
		pages = $("#pages").val();
		sign1 = $("input[name='signed_radio_option']:checked").val();
		sign2 = $("input[name='signed_radio_no_option']:checked").val();

		if (sign1=="no"){
		
			if(sign2=="yes"){
				signature = signatureCost;
				signature = signature.toFixed(2);
			}
			else{
				signature = 0;
				signature = signature.toFixed(2);
			}
		}
		else{
			signature = 0;
			signature = signature.toFixed(2);
		}
		

		if(bodyParts != "" && pages!= ""){

			pageOverage = pages - (bodyParts * 25);

			if(pageOverage < 0){

				overageFee=0;
				pageOverage=0;
				overageFee=overageFee.toFixed(2);
				
			}
			else{

				overageFactor =Math.ceil(pageOverage / 25);
				overageFee =(overageFactor * overageCost);
				overageFee=overageFee.toFixed(2);
			}

			if(bodyParts==1){
				bodyPartTotal = 500;
				bodyPartTotal=bodyPartTotal.toFixed(2);
			}
			else if(bodyParts==2){
				bodyPartTotal = 650;
				bodyPartTotal=bodyPartTotal.toFixed(2);
			}
			else{
				bodyPartTotal = Math.ceil(650 + ((bodyParts - 2) * bodyPartCost));     
				bodyPartTotal=bodyPartTotal.toFixed(2);
			}

			
			grandTotal = (parseFloat(bodyPartTotal) + parseFloat(overageFee) + parseFloat(signature));
			grandTotal=grandTotal.toFixed(2)

			$("#totalBodyParts").html(bodyParts);
			$("#bodyPartPrice").html(bodyPartTotal);
			$("#totalPages").html(pages);
			$("#addPages").html(pageOverage);
			$("#addPagesFee").html(overageFee);
			$("#signature").html(signature);
			$("#grandTotal").html(grandTotal);


			$(".result").show();

		}
	}

	function copy(){

		var id = $("#div_copied").attr('id');
		var el = document.getElementById(id);
		var range = document.createRange();
		range.selectNodeContents(el);
		var sel = window.getSelection();
		sel.removeAllRanges();
		sel.addRange(range);
		document.execCommand('copy');
		$(".copied_notify").text("Copied to clipboard").show().fadeOut(1500);
		
		return false;
	}

	function reset(){

		$("#totalBodyParts").html("");
		$("#bodyPartPrice").html("");
		$("#totalPages").html("");
		$("#addPages").html("");
		$("#addPagesFee").html("");
		$("#grandTotal").html("");
		$("#bodyParts").val("");
		$("#pages").val("");

		$(".result").hide();

	}

});