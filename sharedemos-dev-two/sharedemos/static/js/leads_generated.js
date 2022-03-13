var colors = ["#c3d352", "#93a454", "#9abf53", "#71c5a4", "#289cd1", "#10a5a8", "#e1ed90", "#71c5a4", "#48a7a1"];
var get_random_color = function(){
    return colors[Math.floor(Math.random() * colors.length)];
}
var leads_graph_data = [];
$.each(leads_generated, function(index, lead){
    lead.id = lead.name;
    lead.color = get_random_color();
    var lead_value = {
        'name': lead.name,
        'parent': lead.name,
        'value': lead.value
    }
    delete lead.value;
    leads_graph_data.push(lead);
    leads_graph_data.push(lead_value);
});
$(function () {
    $('#leads_generated').highcharts({
        chart: {
            style: {width: '90%', 'text-align': 'center', 'margin-left': '10%'}
        },
        series: [{
            type: "treemap",
            layoutAlgorithm: 'stripes',
            alternateStartingDirection: true,
            levels: [{
                level: 1,
                layoutAlgorithm: 'sliceAndDice',
                dataLabels: {
                    enabled: true,
                    align: 'left',
                    verticalAlign: 'top',
                    style: {
                        fontSize: '10px',
                        fontWeight: 'bold',
                        color: '#ffffff'
                    }
                }
            }],
            data: leads_graph_data
        }],
        navigation: {
            buttonOptions: {
                enabled: false,
            }
        },
        title: {
            text: 'Hands on Lab Sign Up Treemap'
        }
    });
});