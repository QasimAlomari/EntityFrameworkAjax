using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace Job.Models
{
    public class TaskJob
    {
        [Required]
        [Display(Name = "Id")]
        public int TaskJobId { get; set; }

        [MaxLength(250)]
        [MinLength(2)]
        [Required(ErrorMessage = "Name Is Required")]
        [DisplayName("Name")]
        public string TaskName { get; set; }

        [Required(ErrorMessage = "Description Is Required")]
        [DisplayName("Description")]
        public string TaskDescription { get; set; }
    }
}
