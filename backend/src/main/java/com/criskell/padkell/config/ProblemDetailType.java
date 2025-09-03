package com.criskell.padkell.config;

import static java.net.URI.create;

import java.net.URI;

public class ProblemDetailType {
    public static URI forCode(String code) {
        return create(Constants.PROBLEM_DETAIL_BASE_URL + "/" + code);
    }
}
