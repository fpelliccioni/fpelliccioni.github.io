#include "visualizer.hpp"

template<class Iterator, class Predicate>
Iterator find_if(Iterator first, Iterator last, Predicate p) {
    while (lab::step(), first != last && !p(*first)) {
        lab::step(); ++first;
    }
    lab::step(); return first;
}

extern "C" void run() {
    const int data[] = {1, 3, 8, 5, 6};
    constexpr int size = sizeof(data) / sizeof(data[0]);
    lab::step(); lab::sequence(data, size);

    auto even = [](int value) {
        const bool result = value % 2 == 0;
        lab::predicate(value, result);
        return result;
    };

    lab::step(); const auto result = find_if(lab::Iterator{data}, lab::Iterator{data + size}, even);
    lab::step(); lab::output(static_cast<int>(result.position - data));
}
