package com.nitu.agronow.request;

import com.nitu.agronow.user.User;
import com.nitu.agronow.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RequestService {

    private final UserRepository userRepository;
    private final RequestRepository requestRepository;

    public RequestService(UserRepository userRepository, RequestRepository requestRepository) {
        this.userRepository = userRepository;
        this.requestRepository = requestRepository;
    }

    public void addRequest(Request request) {
        User user = userRepository
                .findById(request.getRequesterId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Request requestToAdd = new Request();
        requestToAdd.setType(request.getType());
        requestToAdd.setStatus(RequestStatus.PENDING.ordinal());
        requestToAdd.setMessage(request.getMessage());
        requestToAdd.setLinks(request.getLinks());
        requestToAdd.setCreatedAt(LocalDateTime.now());
        requestToAdd.setAcceptedAt(null);
        requestToAdd.setUser(user);

        requestRepository.save(requestToAdd);
    }

    public List<RequestResponse> getRequests() {
        List<Request> requests = requestRepository.findAll();

        if (requests.isEmpty()) {
            throw new EntityNotFoundException("Requests not found");
        }

        return requests
                .stream()
                .map(this::toRequestResponse)
                .collect(Collectors.toList());
    }

    public List<RequestResponse> getRequestsByUserId(Integer id) {
        return requestRepository
                .findAll()
                .stream()
                .filter(request -> request.getUser().getId().equals(id))
                .map(this::toRequestResponse)
                .collect(Collectors.toList());
    }


    public RequestResponse getRequestById(Integer id) {
        return requestRepository
                .findById(id)
                .map(this::toRequestResponse)
                .orElseThrow(() -> new EntityNotFoundException("Request not found"));
    }

    public void setRequestStatus(Integer id, RequestStatus status) {
        Request request = requestRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Request not found"));

        request.setStatus(status.ordinal());
        requestRepository.save(request);
    }

    private RequestResponse toRequestResponse(Request request) {
        User user = request.getUser();

        return RequestResponse.builder()
                .id(request.getId())
                .type(request.getType())
                .status(request.getStatus())
                .message(request.getMessage())
                .links(request.getLinks())
                .createdAt(request.getCreatedAt())
                .acceptedAt(request.getAcceptedAt())
                .userId(user.getId())
                .userFullName(user.getFullName())
                .userEmail(user.getEmail())
                .userImageUrl(user.getImageUrl())
                .build();
    }

}
