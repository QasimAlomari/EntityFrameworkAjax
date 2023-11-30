function ShowTost(heading, text, icon, position, afterHidden)
{

    $.toast({
        heading: heading,// 'Headings',
        text: text,// 'You can use the `heading` property to specify the heading of the toast message.',
        icon: icon,// 'warning',
        position: position,//'top-right',
        textAlign: 'center',
        //bgColor: '#28a745',
        textColor: '#ffffff',
        hideAfter: 3000,
        afterHidden: function ()
        {
            if (afterHidden != null) {
                afterHidden()

            }
        }

    })
}

/*MainMaster*/


function ShowSweet(title, text, icon, button)
{
    swal({
        title: title,
        text: text,
        icon: icon,
        button: button,
    })

}
