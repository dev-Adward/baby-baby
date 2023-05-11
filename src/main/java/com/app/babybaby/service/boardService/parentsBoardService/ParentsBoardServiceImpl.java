package com.app.babybaby.service.boardService.parentsBoardService;

import com.app.babybaby.domain.boardDTO.parentsBoardDTO.ParentsBoardDTO;
import com.app.babybaby.entity.board.parentsBoard.ParentsBoard;
import com.app.babybaby.exception.BoardNotFoundException;
import com.app.babybaby.repository.board.parentsBoard.ParentsBoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
//@Qualifier("parentsBoard") @Primary
public class ParentsBoardServiceImpl implements ParentsBoardService {

    private final ParentsBoardRepository parentsBoardRepository;

//    게시글 상세보기
    @Override
    public ParentsBoardDTO getParentsBoardDetail(Long id) {
        ParentsBoard parentsBoard = parentsBoardRepository.findDetailById(id).orElseThrow(() -> {
            throw new BoardNotFoundException();
        });
        return toParentsBoardDTO(parentsBoard);
    }

//    목록 불러오기
    @Override
    public List<ParentsBoardDTO> getParentsBoardList() {
        return null;
    }
}
