package com.bos.workout;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 * TODO JavaDoc needs to written.
 *
 * @author boss
 */
@Controller
public class HomeController {

    @RequestMapping(method = RequestMethod.GET, value="/home")
    public String home() {
        return "index";
    }

}
