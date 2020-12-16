package com.example.crud.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.List;
//import java.util.Optional;

import javax.validation.Valid;

import com.example.crud.model.User;
import com.example.crud.repository.UserRepository;

@CrossOrigin
@RestController // This means that this class is a RestController
@RequestMapping(path="/user") // This means URL's start with /user (after Application path)
public class MainController {
  @Autowired // This means to get the bean called userRepository
         // Which is auto-generated by Spring, we will use it to handle the data
  private UserRepository userRepository;
  
  @PostMapping(path="/add")
   // Map ONLY POST Requests
  public ResponseEntity<String> addNewUser(@Valid User user) {
    // @ResponseBody means the returned String is the response, not a view name
    // @RequestParam means it is a parameter from the GET or POST request
    try {
      userRepository.save(user);
    } catch (Exception e) {
      System.out.println(e.getMessage());
    }
    
    return new ResponseEntity<String>("Cadastrado com sucesso", HttpStatus.OK);
  }

  @GetMapping(path="/add")

    public String formularioCadastrar(){
      return "cadastrar";
  }

  @GetMapping(path="/edit")

  public String edit(){
    return "redirect:/pessoas/listar";
  }

  @GetMapping(path="/ver/{id}")

  public ResponseEntity<?> ver(@PathVariable Integer id) {
    return userRepository.findById(id)
      .map(record -> {
          return new ResponseEntity<String>("Registro encontrado, mostrando dados", HttpStatus.OK);
      }).orElse(ResponseEntity.notFound().build());
    }

  @PutMapping(path="/edit/{id}")

  public ResponseEntity<?> atualizar(Integer id, String email) {

    return userRepository.findById(id)
              .map(record -> {
                record.setEmail(email);
                userRepository.save(record);
                return new ResponseEntity<String>("Registro atualizado com sucesso", HttpStatus.OK);
              })
              .orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping(path="/delete/{id}")

  ResponseEntity<?> deletar(@PathVariable Integer id) {
    return userRepository.findById(id)
           .map(record -> {
               userRepository.deleteById(id);
               return new ResponseEntity<String>("Registro deletado com sucesso", HttpStatus.OK);
           }).orElse(ResponseEntity.notFound().build());
    
  }

  
  @GetMapping(path="/listar")
  public List<User> getAllUsers() {
    // This returns a JSON or XML with the users
    return userRepository.findAll();
  }

  @PostMapping(path="/buscarPorNome")
  public List<User> getUserByName(String name) {
    // This returns a JSON or XML with the users
    if(name.length() == 0){
      return userRepository.findAll();
    }
    
    return userRepository.findByNameContaining(name);
  }

  @GetMapping(path="/ListarPessoas")
    public String ListarPessoas(){
      return "ListarPessoas";
    }
    
}
