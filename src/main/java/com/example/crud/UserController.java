package com.example.crud;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.bind.annotation.RequestMapping;
import javax.validation.Valid;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@Controller
@RequestMapping(path="/pessoas")
public class UserController implements WebMvcConfigurer {
	/*@GetMapping("/add")
	public String showForm(Model model) {
        model.addAttribute("User", new User());*/

    @GetMapping("/cadastrar")
    public String formularioCadastrar() {
		return "cadastrar";
	}
    /*
    public String greeting(@RequestParam(name="name", required=false, defaultValue="Mundo") String name, Model model) {
		model.addAttribute("name", name);
		return "greeting";
    }*/

	@PostMapping("/validar")
	public String checkPersonInfo(@Valid User user, BindingResult bindingResult) {

		if (bindingResult.hasErrors()) {
            return "cadastrar";
            
		}

		return "redirect:/user/add";
	}
	
	@GetMapping("/listar")
	public String listarPessoas(){
		return "ListarPessoas";
	}
}