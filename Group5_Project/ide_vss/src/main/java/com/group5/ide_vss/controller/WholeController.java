package com.group5.ide_vss.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WholeController {

    @RequestMapping("hello")
    public String mainPage() {
        return "MobileComputingProject.html";
    }
}
