package com.example.crud.controller;

import org.springframework.stereotype.Controller;
//import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.bind.annotation.RequestMapping;
//import javax.validation.Valid;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@Controller
@RequestMapping(path="/")
public class UserController implements WebMvcConfigurer {

	@GetMapping("/")
    public String listar() {
		return "ListarPessoas";
	}

    @GetMapping("/add")
    public String formularioCadastrar() {
		return "cadastrar";
	}
	
	@GetMapping("/pessoas")
	public String listarPessoas(){
		return "ListarPessoas";
	}
}