﻿using LetsBook_Flight.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace LetsBook_Flight.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
        public ActionResult Aboutus()
        { 
        
        return View();
        }
        public ActionResult ContactUs() { 
        
         return View();
        }
        [HttpPost]
        public ActionResult ContactUs(FormCollection fc) 
        {

            return RedirectToAction("ThankYou");
            }
        public ActionResult ThankYou() 
        {

            return View();
            }
        public ActionResult TandC() {
            return View();
        }
    }
}