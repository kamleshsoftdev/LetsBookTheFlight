using Microsoft.AspNetCore.Mvc;

namespace LetsBook_Flight.Areas.Flight.Controllers
{
    public class ListenerController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
