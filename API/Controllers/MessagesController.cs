using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [Authorize]
  public class MessagesController : BaseApiController
  {
    private readonly IUserRepository _userRepository;
    private readonly IMessageRepository _messageRepository;
    private readonly IMapper _mapper;
    public MessagesController(IUserRepository userRepository,
                              IMessageRepository messageRepository,
                              IMapper mapper)
    {
      _mapper = mapper;
      _messageRepository = messageRepository;
      _userRepository = userRepository;
    }

  [HttpPost]
  public async Task<ActionResult<MessageDto>> CreateMessage(CreateMessageDto createMessageDto)
  {
    var username = User.getUsername();
    if (username.ToLower() == createMessageDto.RecepientUsername.ToLower())
      return BadRequest("You cannot message yourself");

    var sender = await _userRepository.GetUserByUsernameAsync(username);
    var recepient = await _userRepository.GetUserByUsernameAsync(createMessageDto.RecepientUsername);

    if (recepient == null) return NotFound();

    var message = new Message
    {
      Sender = sender,
      Recepient = recepient,
      SenderUsername = sender.UserName,
      RecepientUsername = recepient.UserName,
      Content = createMessageDto.Content
    };

    _messageRepository.AddMessage(message);

    if(await _messageRepository.SaveAllAsync()) return Ok(_mapper.Map<MessageDto>(message));

    return BadRequest("Failed to send message");
  }

  [HttpGet]
  public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessagesForUser( [FromQuery]
    MessageParams messageParams) 
  {
      messageParams.Username = User.getUsername();

      var messages = await _messageRepository.GetMessagesForUser(messageParams);

      Response.AddPaginationHeader(messages.CurrentPage, messages.Count, messages.TotalCount, messages.TotalPages);

      return messages;
  }

  [HttpGet("thread/{username}")]
  public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessageThread(string username)
  {
      var currentUsername = User.getUsername();

      return Ok(await _messageRepository.GetMessageThread(currentUsername, username));
  }
}
}